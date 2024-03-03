import { report_type, inspection_status, attachment_type } from "@prisma/client";
import { object,string,ref,number, array, mixed, } from "yup";

// Define the schema for the register user object

export const registerUser = object().shape({
  firstname: string().trim().required("First name is required").min(2, "First name must be at least 2 characters"),
  lastname: string().trim().required("Last name is required").min(2, "Last name must be at least 2 characters"),
  username: string().trim().required("Username is required"),
  password: string().trim().required("Password is required").min(6, "Password must be at least 6 characters"),
  passwordConfirm: string().trim().required("Password confirmation is required").oneOf([ref("password")], "Passwords must match"),
  organizationId: number().required("Organization ID is required"),
});

export const loginUser = object().shape({
  username: string().trim().required("Username is required"),
  password: string().trim().required("Password is required"),
});

export const getReportStructure = object().shape({
  ln: string().trim().oneOf(["fi", "en"], "Invalid language").default("fi"),
  report_type: mixed<report_type>().oneOf(["petrol", "electric","hybrid"], "Invalid report type").default("petrol"),
});

export const saveReportStructure = object().shape(
  {
    registeration_number: string().trim().required("Registration number is required"),
    report_type: mixed<report_type>().required("Report type is required").oneOf(["petrol", "electric","hybrid"], "Invalid report type"),
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