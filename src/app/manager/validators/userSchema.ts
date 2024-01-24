import * as yup from 'yup';

export const userSchema = yup.object().shape({
    userEmail: yup.string().email('Invalid email').required('Email is required'),
  });