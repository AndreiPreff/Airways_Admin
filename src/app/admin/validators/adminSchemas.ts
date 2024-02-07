import * as yup from "yup";



export const Adminschema = yup.object().shape({
  first_name: yup.string().required('First Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  last_name: yup.string().required('Last Name is required'),
  role: yup.string().required('Role is required'),
});

