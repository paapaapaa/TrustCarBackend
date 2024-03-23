import { object,string,number } from "yup";

export const registerUser = object().shape({
  firstname: string().trim().required("First name is required").min(2, "First name must be at least 2 characters"),
  lastname: string().trim().required("Last name is required").min(2, "Last name must be at least 2 characters"),
  username: string().trim().required("Username is required"),
  password: string().trim().required("Password is required").min(6, "Password must be at least 6 characters"),
  organizationId: number().required("Organization ID is required"),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     LoginUser:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user
 *           minLength: 1
 *           example: testuser
 *         password:
 *           type: string
 *           description: The password of the user
 *           minLength: 1
 *           example: testpassword
 */
export const loginUser = object().shape({
  username: string().trim().required("Username is required"),
  password: string().trim().required("Password is required"),
});