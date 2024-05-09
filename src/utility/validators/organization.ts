import { object,string } from "yup";
import { organization_type } from "@prisma/client";


/**
 * @openapi
 * components:
 *   schemas:
 *     Organization:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         name:
 *           type: string
 *         type:
 *           type: string
 *           enum:
 *             - maintenance
 *             - seller
 *             - inspection
 *             - repair
 *         business_number:
 *           type: string
 *         address:
 *           type: string
 *         city:
 *           type: string
 *         postcode:
 *           type: integer
 *           format: int32
 *         phone:
 *           type: integer
 *           format: int64
 *         email:
 *           type: string
 * 
 */ 
export const getOrganizationsValidator = object().shape({
    type: string().trim().oneOf(Object.values(organization_type), "Invalid Type"),
});