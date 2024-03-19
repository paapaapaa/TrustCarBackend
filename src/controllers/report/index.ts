import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {getLanguageId, Language} from "../../middleware/types/language";
import {EngineType, getEngineType, getReportType, ReportType} from "../../middleware/types/report";
import {getReportStructureValidator, getReportValidator, saveReportValidator} from "../../utility/validators/report";
import {REPORT_NOT_FOUND} from "../../messages/report";

const prisma = new PrismaClient();

export const getReportStructure = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const { language, report_type, engine_type } = getReportStructureValidator.cast(req.query);
  const languageId: Language = getLanguageId(language);
  const reportType: ReportType = getReportType(report_type);
  const engineType: EngineType = getEngineType(engine_type);

  try {
    const data = await prisma.section.findMany({
      select: {
        id: true,
        translations: {
          where: {
            language_id: languageId,
          },
          select: {
            value: true
          },
        },
        question_map: {
          where: {
            AND:[
              {
                report_type: reportType,
              },
              {
                engine_type: engineType,
              }
            ]
          },
          select: {
            question: {
              select: {
                id: true,
                translations: {
                  where: {
                    language_id: languageId,
                  },
                  select: {
                    value: true
                  },
                },
              },
            },
          },
        },
      },
    });

    const formattedData = {
      sections: data.map(section => ({
        id: section.id,
        name: section.translations[0]?.value,
        questions: section.question_map.map(qm => ({
          id: qm.question.id,
          name: qm.question.translations[0]?.value
        }))
      }))
    }

    res.status(200).json(formattedData);
  } catch (error) {
    next(error);
  }
};

export const saveReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {  

  const { userId, organizationId } = req.params;
  const modified_by_user = parseInt(userId);
  const organization_id = parseInt(organizationId);

  const {
    brand_and_model,
    odometer_reading,
    production_number,
    registration_number,
    engine_type,
    report_rows,
  } = saveReportValidator.cast(req.body);
  try {
    const data = await prisma.report.create({
      data: {
        brand_and_model,
        modified_by_user,
        odometer_reading,
        organization_id,
        production_number,
        registration_number,
        engine_type,
        report_rows: {
          create: report_rows.map(row => ({
            question_id: row.question_id,
            inspection_status: row.inspection_status,
            comment: row.comment,
            attachments: row.attachments && row.attachments.length > 0 ? {
              create: row.attachments.map(attachment => ({
                attachment_type: attachment.attachment_type,
                data: Buffer.from(attachment.data, "base64"),
              })),
            } : undefined,
          })),
        },
      },
    });

    res.status(201).json({
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getReport = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  const { reportId, language } = getReportValidator.cast(req.query);
  try {
    const languageId = getLanguageId(language);
    const data = await prisma.report.findFirst({
      where: {
        id: reportId as unknown as number,
      },
      include: {
        report_rows: {
          include: {
            attachments: true,
            question: {
              include: {
                translations: {
                  where: {
                    language_id: languageId,
                  },
                  select: {
                    value: true,
                  },
                },
                question_map: {
                  include: {
                    section: {
                      include: {
                        translations: {
                          where: {
                            language_id: languageId,
                          },
                          select: {
                            value: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!data?.report_rows) {
      res.status(404).json({
        message: REPORT_NOT_FOUND
      })
    }

    const formattedData = {
      reportRows: data ? data.report_rows
          .map((reportRow: any) => ({
            comment: reportRow.comment,
            inspection_status: reportRow.inspection_status,
            attachments: reportRow.attachments,
            question: {
              name: reportRow?.question?.translations[0]?.value
            }
          })) : []
    };

    res.status(200).json(formattedData);
  } catch (error) {
    next(error);
  }
};
