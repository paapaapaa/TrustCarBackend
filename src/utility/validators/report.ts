import {attachment_type, engine_type, inspection_status, report_type} from "@prisma/client";
import { object,string,number, array, mixed, } from "yup";

/**
 * @openapi
 * components:
 *   schemas:
 *     ReportStructure:
 *       type: object
 *       properties:
 *         language:
 *           type: string
 *           description: Language of the report.
 *           enum:
 *             - fi
 *             - en
 *           default: fi
 *         engine_type:
 *           type: string
 *           description: Type of engine for the report.
 *           enum:
 *             - petrol
 *             - diesel
 *             - electric
 *             - hybrid
 *             - hybrid_diesel
 *             - hybrid_petrol
 *           default: petrol
 *         report_type:
 *           type: string
 *           description: Type of the report.
 *           enum:
 *             - full
 *             - narrow
 *             - light
 *           default: full
 *         sections:
 *           type: array
 *           description: Sections for the report
 *           items:
 *             type: integer
 *           example:
 *             - 1
 *             - 2
 *           nullable: true
 * 
 */
export const getReportStructureValidator = object().shape({
    language: string().trim().oneOf(["fi", "en"], "Invalid language").default("fi"),
    engine_type: mixed<engine_type>().oneOf(Object.values(engine_type), "Invalid engine type").default("petrol"),
    report_type: mixed<report_type>().oneOf(Object.values(report_type), "Invalid report type").default("full"),
    sections:array().when("report_type",{
        is: report_type.light,
        then: (schema) => schema.min(1, "At least one section is required").of(number().required("Section ids are required")),
       otherwise: (schema) => schema.notRequired(),
    })
});


/**
 * @openapi
 * components:
 *   schemas:
 *     SaveReport:
 *       type: object
 *       properties:
 *         order_id:
 *           type: number
 *           description: ID of the order.
 *         registration_number:
 *           type: string
 *           description: Registration number of the vehicle.
 *           default: "ABC-123"
 *         engine_type:
 *           type: string
 *           description: Type of engine.
 *           enum:
 *             - petrol
 *             - diesel
 *             - electric 
 *             - hybrid
 *             - hybrid_diesel
 *             - hybrid_petrol
 *         brand_and_model:
 *           type: string
 *           description: Brand and model of the vehicle.
 *           default: "Toyota Corolla"
 *         odometer_reading:
 *           type: number
 *           description: Odometer reading of the vehicle.
 *           default: 10000
 *         production_number:
 *           type: string
 *           description: Production number of the vehicle.
 *           default: "123456"
 *         report_rows:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               question_id:
 *                 type: number
 *                 description: ID of the question.
 *                 default: 1
 *               inspection_status:
 *                 type: string
 *                 description: Inspection status.
 *                 enum:
 *                   - green
 *                   - yellow
 *                   - red
 *                 default: yellow
 *               comment:
 *                 type: string
 *                 description: Comment for the report row.
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     attachment_type:
 *                       type: string
 *                       description: Type of attachment.
 *                       enum:
 *                         - image
 *                         - audio
 *                     data:
 *                       type: string
 *                       description: Attachment data.
 *       required:
 *         - registration_number
 *         - engine_type
 *         - brand_and_model
 *         - odometer_reading
 *         - production_number
 *         - report_rows
 *         - order_id
 */
export const saveReportValidator = object().shape(
    {
        registration_number: string().trim().required("Registration number is required"),
        engine_type: mixed<engine_type>().required("Engine type is required").oneOf(Object.values(engine_type), "Invalid report type"),
        brand_and_model: string().trim().required("Brand and model is required"),
        odometer_reading: number().required("Odometer reading is required"),
        production_number: string().trim().required("Production number is required"),
        report_rows:array().defined().of(
            object().shape({
                question_id: number().required("Question id is required"),
                inspection_status: mixed<inspection_status>().required("Inspection status is required").oneOf(Object.values(inspection_status), "Invalid inspection status"),
                comment: string().trim(),
                attachments: array().of(
                    object().shape({
                        attachment_type: mixed<attachment_type>().required("Attachment type is required").oneOf(Object.values(attachment_type), "Invalid attachment type"),
                        data: string().required("Attachment data is required"),
                    }),
                ),
            }).required("Report row is required"),
        ).required("Report rows are required"),
        order_id: number().required("Order id is required"),
    }
);

export const getReportValidator = object().shape({
    registration_number: string().trim().required("Registration number is required"),
    language: string().trim().oneOf(["fi", "en"], "Invalid language").default("fi"),
});

export const populateReportValidator = object().shape({
    registration_number: string().trim().required("Registration number is required"),
    language: string().trim().oneOf(["fi","en"],"Invalid language").default("fi"),
    report_id: string().trim().required("Report id is required"),
});