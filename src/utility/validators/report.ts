import {attachment_type, engine_type, inspection_status, report_type} from "@prisma/client";
import { object,string,number, array, mixed, } from "yup";

export const getReportStructure = object().shape({
    language: string().trim().oneOf(["fi", "en"], "Invalid language").default("fi"),
    engine_type: mixed<engine_type>().oneOf(Object.values(engine_type), "Invalid report type").default("petrol"),
    report_type: mixed<report_type>().oneOf(Object.values(report_type), "Invalid report type").default("full"),

});

export const saveReportStructure = object().shape(
    {
        registration_number: string().trim().required("Registration number is required"),
        engine_type: mixed<engine_type>().required("Report type is required").oneOf(Object.values(engine_type), "Invalid report type"),
        brand_and_model: string().trim().required("Brand and model is required"),
        odometer_reading: number().required("Odometer reading is required"),
        production_number: number().required("Production number is required"),
        report_rows:array().defined().of(
            object().shape({
                question_id: number().required("Question id is required"),
                inspection_status: mixed<inspection_status>().required("Inspection status is required").oneOf(Object.values(inspection_status), "Invalid inspection status"),
                comment: string().trim().required("Comment is required"),
                attachment: array().defined().of(
                    object().shape({
                        attachment_type: mixed<attachment_type>().required("Attachment type is required").oneOf(Object.values(attachment_type), "Invalid attachment type"),
                        data: string().required("Attachment data is required"),
                    }),
                ),
            }).required("Report rows are required"),
        )
    }
);