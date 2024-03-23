import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {
  getReportStructureValidator,
  saveReportValidator,
  getReportValidator,
} from "../../utility/validators/report";
import { ReportStructureResponse } from "../../utility/types/report";

const prisma = new PrismaClient();

export const getReportStructure = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { language, report_type, engine_type } =
    getReportStructureValidator.cast(req.query);

  try {
    const data = await prisma.section.findMany({
      select: {
        id: true,
        translations: {
          where: {
            language: {
              is: {
                code: language,
              },
            },
          },
          select: {
            value: true,
          },
        },
        question_map: {
          where: {
            AND: [
              {
                report_type,
              },
              {
                engine_type,
              },
            ],
          },
          select: {
            question: {
              select: {
                id: true,
                translations: {
                  where: {
                    language: {
                      is: {
                        code: language,
                      },
                    },
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
    });

    const formattedData: ReportStructureResponse[] = data.map((section) => {
      const id = section.id;
      const name = section.translations[0].value;
      const questions_map = section.question_map;
      const questions = questions_map.map((qm) => ({
        id: qm.question.id,
        name: qm.question.translations[0].value,
      }));

      return {
        id,
        name,
        questions,
      };
    });

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
          create: report_rows.map((row) => ({
            question_id: row.question_id,
            inspection_status: row.inspection_status,
            comment: row.comment,
            attachments:
              row.attachments && row.attachments.length > 0
                ? {
                    create: row.attachments.map((attachment) => ({
                      attachment_type: attachment.attachment_type,
                      data: Buffer.from(attachment.data, "base64"),
                    })),
                  }
                : undefined,
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
  const { registration_number } = getReportValidator.cast(req.query);
  try {
    const data = await prisma.report.findMany({
      where: {
        registration_number,
      },
    });

    if (!data || data === null || data.length === 0) {
      res.status(404).json({
        message: "Report not found",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
