import { NextFunction, Request, Response } from "express";
import {
  getReportStructure as reportStructure,
  saveReportStructure,
} from "../../utility/validators";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getReportStructure = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const { ln, report_type } = reportStructure.cast(req.query);
  const language = ln === "fi" ? "finnish_text" : "english_text";

  try {
    const data = await prisma.section.findMany({
      select: {
        id: true,
        traslations: {
          select: {
            [language]: true,
          },
        },
        question_map: {
          where: {
            AND:[
              {
                report_type: report_type,
              },
              {
                report_variant: "full",
              }
            ]
          },
          select: {
            question: {
              select: {
                id: true,
                traslations: {
                  select: {
                    [language]: true,
                  },
                },
              },
            },
          },
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

export const saveReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {  

  const { userId, organizationId } = req.params;
  const modified_by_user = parseInt(userId);
  const organization_id = parseInt(organizationId);

  console.log(req.params);

  const {
    brand_and_model,
    odometer_reading,
    production_number,
    registeration_number,
    report_type,
    report_rows,
  } = saveReportStructure.cast(req.body);
  try {
    const data = await prisma.report.create({
      data: {
        brand_and_model,
        modified_by_user,
        odometer_reading,
        organization_id,
        production_number,
        registeration_number,
        report_type,
        report_rows: {
          create:{
            question_id: report_rows[0].question_id,
            inspection_status: report_rows[0].inspection_status,
            comment: report_rows[0].comment,
            attachments: {
              create:{
                attachment_type: report_rows[0].attachment[0].attachment_type,
                data: Buffer.from(report_rows[0].attachment[0].data, "base64"),
              }
            }
          },
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
  const { reportId } = req.params;
  try {
    const data = await prisma.report.findFirst({
      where: {
        registeration_number: reportId,
      },
      include:{
        report_rows:{
          include:{
            attachments:true,
            question:{
              include:{
                traslations:{
                  select:{
                    finnish_text:true,
                  },
                },
                question_map:{
                  select:{
                    section:{
                      include:{
                        traslations:{
                          select:{
                            finnish_text:true,
                          },
                        },
                      },
                    }
                  }
                }
              }
            
            }
          }
        
        }
      }
    });

    res.status(201).json({
      data,
    });
  } catch (error) {
    next(error);
  }
};
