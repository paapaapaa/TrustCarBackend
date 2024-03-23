import { engine_type } from "@prisma/client";

/**
 * @openapi
 * components:
 *   schemas:
 *     ReportStructureResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: The ID of the report section.
 *         name:
 *           type: string
 *           description: The name of the report section.
 *         questions:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 description: The ID of the question.
 *               name:
 *                 type: string
 *                 description: The name of the question.
 */
export type ReportStructureResponse = {
  id: number;
  name: string | null;
  questions:
    | {
        id: number;
        name: string | null;
      }[]
    | null;
};

/**
 * @openapi
 * components:
 *   schemas:
 *     SaveReportResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: The unique identifier of the report.
 *         brand_and_model:
 *           type: string
 *           description: The brand and model of the report.
 *         created_at:
 *           type: string
 *           description: The timestamp when the report was created.
 *         engine_type:
 *           type: string
 *           enum:
 *             - petrol
 *             - diesel
 *             - hybrid_diesel
 *             - hybrid_gasoline
 *             - electric
 *             - hybrid
 *           description: The type of engine used.
 *         modified_by_user:
 *           type: number
 *           description: The ID of the user who modified the report.
 *         odometer_reading:
 *           type: number
 *           description: The odometer reading at the time of the report.
 *         organization_id:
 *           type: number
 *           description: The ID of the organization associated with the report.
 *         production_number:
 *           type: string
 *           description: The production number of the report.
 *         registration_number:
 *           type: string
 *           description: The registration number of the report.
 *         updated_at:
 *           type: string
 *           description: The timestamp when the report was last updated.
 */
export type SaveReportResponse = {
  brand_and_model: string;
  created_at: string;
  engine_type: engine_type;
  id: number;
  modified_by_user: number;
  odometer_reading: number;
  organization_id: number;
  production_number: string;
  registration_number: string;
  updated_at: string;
};

/**
 * @openapi
 * components:
 *   schemas:
 *     GetReportResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The ID of the car.
 *         registration_number:
 *           type: string
 *           description: The registration number of the car.
 *         production_number:
 *           type: string
 *           description: The production number of the car.
 *         brand_and_model:
 *           type: string
 *           description: The brand and model of the car.
 *         odometer_reading:
 *           type: number
 *           description: The odometer reading of the car.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the car was created. (ISO 8601 format)
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the car was last updated. (ISO 8601 format)
 *         modified_by_user:
 *           type: integer
 *           description: The ID of the user who last modified the car.
 *         organization_id:
 *           type: integer
 *           description: The ID of the organization the car belongs to.
 *         engine_type:
 *           type: string
 *           description: The type of engine of the car.
 *           enum:
 *             - petrol
 *             - diesel
 *             - hybrid_diesel
 *             - hybrid_gasoline
 *             - electric
 *             - hybrid
 * 
 */
export type GetReportResponse = {
  id: number;
  registration_number: string;
  production_number: string;
  brand_and_model: string;
  odometer_reading: number;
  created_at: string; // Assuming ISO 8601 format for dates
  updated_at: string; // Assuming ISO 8601 format for dates
  modified_by_user: number;
  organization_id: number;
  engine_type: engine_type;
};
