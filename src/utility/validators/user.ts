import { object,string,number } from "yup";

export const registerUser = object().shape({
  firstname: string().trim().required("First name is required").min(2, "First name must be at least 2 characters"),
  lastname: string().trim().required("Last name is required").min(2, "Last name must be at least 2 characters"),
  username: string().trim().required("Username is required"),
  password: string().trim().required("Password is required").min(6, "Password must be at least 6 characters"),
  organizationId: number().required("Organization ID is required"),
});

export const loginUser = object().shape({
  username: string().trim().required("Username is required"),
  password: string().trim().required("Password is required"),
});