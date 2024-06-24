import { object,string,mixed, number, array, date } from "yup";
import { engine_type, order_status, report_type } from "@prisma/client";

/**
 * @openapi
 * components:
 *   schemas:
 *     OrderDetails:
 *       type: object
 *       properties:
 *         registration_number:
 *           type: string
 *           description: Registration number of the car
 *         car_production_number:
 *           type: string
 *           description: Car production number
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
 *         brand_and_model:
 *           type: string
 *           description: Brand and model of the car
 *         report_type:
 *           type: string
 *           description: Type of the report.
 *           enum:
 *             - full
 *             - narrow
 *             - light
 *         additional_information:
 *           type: string
 *           description: Additional information (optional)
 *         additional_information2:
 *           type: string
 *           description: Additional information 2 (optional)
 *         inspection_organization_id:
 *           type: integer
 *           description: Inspection organization id
 *         sections:
 *           type: array
 *           description: Sections for the report
 *           items:
 *             type: integer
 *           example:
 *             - 1
 *             - 2
 *           nullable: true
 *       required:
 *         - registration_number
 *         - car_production_number
 *         - engine_type
 *         - brand_and_model
 *         - report_type
 *         - inspection_organization_id
 */
export const createOrderValidator = object().shape(
    {
        registration_number: string().trim().required("Registration number is required"),
        car_production_number: string().trim().required("Car production number is required"),
        engine_type: mixed<engine_type>().required("Engine type is required").oneOf(Object.values(engine_type), "Invalid engine type"),
        brand_and_model: string().trim().required("Brand and model is required"),
        report_type: mixed<report_type>().required("Report type is required").oneOf(Object.values(report_type), "Invalid report type"),
        additional_information: string().trim().optional(),
        additional_information2: string().trim().optional(),
        inspection_organization_id: number().required("Inspection organization id is required"),
        sections:array().when("report_type",{
            is: report_type.light,
            then: (schema) => schema.min(1, "At least one section is required").of(number().required("Section ids are required")),
           otherwise: (schema) => schema.notRequired(),
        })
    }
);

export const getOrderPriceValidator = object().shape(
    {
        report_type: mixed<report_type>().required("Report type is required").oneOf(Object.values(report_type), "Invalid report type"),
        engine_type: mixed<engine_type>().required("Engine type is required").oneOf(Object.values(engine_type), "Invalid engine type"),
        sections:array().when("report_type",{
            is: report_type.light,
            then: (schema) => schema.min(1, "At least one section is required").of(number().required("Section ids are required")),
           otherwise: (schema) => schema.notRequired(),
        })
    }
);

/**
 * @openapi
 * components:
 *   schemas:
 *     OrderStatus:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: The ID of the order. Required.
 *         status:
 *           type: string
 *           enum: 
 *             - started
 *             - not_started
 *             - ready
 *           description: The status of the order. Required. Must be one of the predefined order statuses.
 *         delivery_date:
 *           type: string
 *           format: date-time
 *           description: The delivery date of the order. Optional.
 *       required:
 *         - id
 *         - status
 */
export const updateOrderValidator = object().shape(
    {
        id: number().required("Order id is required"),
        status: mixed<order_status>().required("Status is required").oneOf(Object.values(order_status), "Invalid status"),
        delivery_date: date().optional(),
    });

/**
 * @openapi
 * components:
 *   schemas:
 *     Section:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         unit_price:
 *           type: integer
 *         translations:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               value:
 *                 type: string
 */




/**
 * @openapi
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int32
 *           description: The unique identifier for the order.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the order was created.
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the order was last updated.
 *         customer_id:
 *           type: integer
 *           description: The ID of the customer who created the order.
 *         inspector_id:
 *           type: integer
 *           description: The ID of the inspector assigned to the order.
 *         inspection_organization_id:
 *           type: integer
 *           description: The ID of the organization conducting the inspection.
 *         customer_organization_id:
 *           type: integer
 *           description: The ID of the organization associated with the customer.
 *         registration_number:
 *           type: string
 *           description: The registration number of the car.
 *         car_production_number:
 *           type: string
 *           description: The production number of the car.
 *         brand_and_model:
 *           type: string
 *           description: The brand and model of the car.
 *         report_type:
 *           type: string
 *           description: Type of the report.
 *           enum:
 *             - full
 *             - narrow
 *             - light
 *         engine_type:
 *           description: The type of engine in the car.
 *           enum:
 *             - petrol
 *             - diesel
 *             - electric
 *             - hybrid
 *             - hybrid_diesel
 *             - hybrid_petrol 
 *         additional_information:
 *           type: string
 *           description: Additional information related to the order.
 *         additional_information2:
 *           type: string
 *           description: Additional information related to the order.
 *         order_total_amount:
 *           type: integer
 *           description: The total amount of the order.
 *         order_status:
 *           description: The status of the order.
 *           enum:
 *             - not_started
 *             - started
 *             - ready
 */