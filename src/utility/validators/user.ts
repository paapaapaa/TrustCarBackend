import { object,string,number } from "yup";


/**
 * @openapi
 * components:
 *   schemas:
 *     RegisterUser:
 *       type: object
 *       required:
 *         - firstname
 *         - lastname
 *         - username
 *         - password
 *         - organizationId
 *       properties:
 *         firstname:
 *           type: string
 *           description: The first name of the user
 *           minLength: 2
 *           example: John
 *         lastname:
 *           type: string
 *           description: The last name of the user
 *           minLength: 2
 *           example: Doe
 *         username:
 *           type: string
 *           description: The username of the user
 *           example: johndoe
 *         password:
 *           type: string
 *           description: The password of the user
 *           minLength: 6
 *           example: password123
 *         organizationId:
 *           type: number
 *           description: The ID of the organization the user belongs to
 *           example: 123
 */
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