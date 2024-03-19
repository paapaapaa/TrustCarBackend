import {number, object} from "yup";

export const getIdStructure = object().shape({
    id: number().required("ID is required"),
});