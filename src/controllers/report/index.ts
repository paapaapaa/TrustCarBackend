import { NextFunction, Request, Response } from "express";
import { PrismaClient, organization_type } from "@prisma/client";
import {
  getReportStructureValidator,
  saveReportValidator,
  getReportValidator,
  populateReportValidator,
} from "../../utility/validators/report";
import { ReportStructureResponse } from "../../utility/types/report";

const prisma = new PrismaClient();

export const getReportStructure = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { language, report_type, engine_type, sections } =
    getReportStructureValidator.cast(req.query);


  try {
    if (report_type !== "light") {
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
                  type: true,
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
        type: qm.question.type,
      }));

        return {
          id,
          name,
          questions,
        };
      });
      res
        .status(200)
        .json(formattedData.filter((section) => section.questions!.length > 0));
    } else if (report_type === "light" && sections) {
      const data = await prisma.section.findMany({
        where: {
          id:{
            in: sections,
          },    
        },
        select:{
          id:true,
          translations:{
            where:{
              language:{
                is:{
                  code: language,
                },
              },
            },
            select:{
              value:true,
            },
          },
          question_map:{
            where:{
              AND:[
                {
                  report_type:"full",
                },
                {
                  engine_type,
                },
              ]
            },
            select:{
              question:{
                select:{
                  id:true,
                  translations:{
                    where:{
                      language:{
                        is:{
                          code: language,
                        },
                      },
                    },
                    select:{
                      value:true,
                    },
                  },
                },
              },
            },
          },
        }
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
    } else {
      res.status(404).json({
        message: "Report structure not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const saveReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, organizationId, organizationType } = req.params;
  const modified_by_user = parseInt(userId);
  const organization_id = parseInt(organizationId);
  const organization_type = organizationType as organization_type;
  
  if(organization_type !== "inspection"){
    res.status(403).json({
      message: "You are not allowed to save reports",
    });
  }

  const {
    brand_and_model,
    odometer_reading,
    production_number,
    registration_number,
    engine_type,
    report_rows,
    order_id
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
              input_left: row.input_left,
              input_left_measurement: row.input_left_measurement,
              input_right: row.input_right,
              input_right_measurement: row.input_right_measurement,
              additional_input: row.additional_input,
              additional_input_measurement: row.additional_input_measurement,
          })),
        },
      },
    });

    const order = await prisma.order.findFirst({ 
      where: {
        id: order_id,
      },
      include: {
        order_rows: true,
      }
    });

    if(!order){
      res.status(404).json({
        message: "Order not found",
      });
    }

    await prisma.order_row.deleteMany({
      where: {
        order_id,
      },
    });

    await prisma.order.delete({
      where: {
        id: order_id,
      },
    });

    if(order){
      const delivered_order = await prisma.delivered_order.create({
        data:{
          customer_id: order.customer_id!,
          inspector_id: modified_by_user,
          inspection_organization_id: organization_id,
          customer_organization_id: order.customer_organization_id,
          delivery_date: new Date(),
          registration_number: order.registration_number,
          car_production_number: order.car_production_number,
          brand_and_model: order.brand_and_model,
          engine_type: order.engine_type,
          additional_information: order.additional_information!,
          additional_information2: order.additional_information2!,
          order_total_amount: order.order_total_amount,
          order_status: "ready",
          report_id: data.id,
        }
      });

      await prisma.delivered_order_row.createMany({
        data: order.order_rows.map((row) => ({
          order_id: delivered_order.id,
          section_id: row.section_id,
        })),
      });
    }
    
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

export const populateReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { language, registration_number, report_id } =
    populateReportValidator.cast(req.query);

  const report_id_number = parseInt(report_id, 10);

  try {
    const reportData = await prisma.report.findUnique({
      where: {
        registration_number,
        id: report_id_number,
      },
      include: {
        organization: true,
      },
    });
    if (!reportData || reportData === null) {
      res.status(404).json({
        message: "Report not found",
      });
    }
    const inspectorId = reportData!.modified_by_user
      ? reportData!.modified_by_user
      : undefined;

    const inspectorName = await prisma.user.findUnique({
      where: {
        id: inspectorId,
      },
      select: {
        firstname: true,
        lastname: true,
      },
    });
    const sectionsData = await prisma.section.findMany({
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
    });
    const translationsData = await prisma.report.findUnique({
      where: {
        registration_number,
        id: report_id_number,
      },
      select: {
        registration_number: true,
        production_number: true,
        brand_and_model: true,
        modified_by_user: true,
        odometer_reading: true,
        updated_at: true,
        organization: true,
        report_rows: {
          select: {
            comment: true,
            inspection_status: true,
            question: {
              select: {
                question_map: {
                  select: {
                    section_id: true,
                  },
                },
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

    if (!translationsData || translationsData === null) {
      res.status(404).json({
        message: "Couldn't fetch report translations",
      });
    }

    const breaklineTitle =
      language === "en" ? "INSPECTION TARGETS" : "TARKASTUSKOHTEET";
    const basicInfoTitle =
      language === "en" ? "Basic information" : "Perustiedot";
    const inspectorInfoTitle =
      language === "en" ? "Inspector information" : "Tarkastajan tiedot";

    const inspectorFullName =
      inspectorName?.firstname && inspectorName?.lastname
        ? inspectorName?.firstname + " " + inspectorName?.lastname
        : "";

    const headerSections = [
      {
        sectionName: basicInfoTitle,
        rows: [
          {
            question:
              language === "en" ? "Registration number" : "Rekisterinumero",
            comment: reportData!.registration_number,
          },
          {
            question: language === "en" ? "Brand and model" : "Merkki ja malli",
            comment: reportData!.brand_and_model,
          },
          {
            question:
              language === "en" ? "Production number" : "Valmistenumero",
            comment: reportData!.production_number,
          },
          {
            question:
              language === "en" ? "Odometer reading" : "Matkamittarin lukema",
            comment: reportData!.odometer_reading,
          },
        ],
      },
      {
        sectionName: inspectorInfoTitle,
        rows: [
          {
            question: language === "en" ? "Inspector" : "Tarkastaja",
            comment: inspectorFullName,
          },
          {
            question: language === "en" ? "Inspection date" : "Tarkastuspäivä",
            comment: reportData!.updated_at,
          },
          {
            question:
              language === "en" ? "Inspection station" : "Tarkastusasema",
            comment: reportData!.organization?.name
              ? reportData!.organization?.name
              : "",
          },
          {
            question:
              language === "en"
                ? "Station phone number"
                : "Aseman puhelinnumero",
            comment: reportData!.organization?.phone
              ? reportData!.organization?.phone
              : "",
          },
          {
            question: language === "en" ? "Station address" : "Aseman osoite",
            comment: reportData!.organization?.address
              ? reportData!.organization?.address
              : "",
          },
          {
            question: language === "en" ? "Station email" : "Aseman sähköposti",
            comment: reportData!.organization?.email
              ? reportData!.organization?.email
              : "",
          },
        ],
      },
    ];

    const sections: {
      sectionName: string;
      rows: {
        question: string | null | undefined;
        status: string;
        comment: string;
      }[];
    }[] = [];

    translationsData!.report_rows.forEach((row) => {
      const sectionId = row.question?.question_map[0]?.section_id;
      const sectionName = sectionId
        ? sectionsData.find((section) => section.id === sectionId)
            ?.translations[0]?.value
        : null;
      const rowStatus = row.inspection_status ? row.inspection_status : "green";
      const rowComment =
        rowStatus === "green"
          ? "Ok"
          : row.comment
          ? row.comment
          : rowStatus === "red"
          ? "red"
          : "yellow";

      if (sectionId && sectionName) {
        let sectionIndex = sections.findIndex(
          (group) => group.sectionName === sectionName
        );
        if (sectionIndex === -1) {
          sections.push({ sectionName, rows: [] });
          sectionIndex = sections.length - 1;
        }

        sections[sectionIndex].rows.push({
          question: row.question?.translations[0]?.value,
          status: rowStatus,
          comment: rowComment,
        });
      }
    });

    res.render("report-skeleton", {
      headerSections: headerSections,
      sections: sections,
      breaklineTitle: breaklineTitle,
    });
  } catch (error) {
    next(error);
  }
};
