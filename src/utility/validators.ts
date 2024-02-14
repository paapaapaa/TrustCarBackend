import { object,string,ref } from "yup";

// Define the schema for the register user object
export const registerUser = object().shape({
  firstname: string().trim().required("First name is required").min(2, "First name must be at least 2 characters"),
  lastname: string().trim().required("Last name is required").min(2, "Last name must be at least 2 characters"),
  username: string().trim().required("Username is required"),
  password: string().trim().required("Password is required").min(6, "Password must be at least 6 characters"),
  passwordConfirm: string().trim().required("Password confirmation is required").oneOf([ref("password")], "Passwords must match"),
});
export const loginUser = object().shape({
  username: string().trim().required("Username is required"),
  password: string().trim().required("Password is required"),
});