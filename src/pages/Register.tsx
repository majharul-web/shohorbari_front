import { Alert } from "@/components/ui/alert/Alert";
import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/form/InputField";
import { useCreateUserMutation } from "@/redux/api/authApi";
import { isSuccess } from "@/utils/common";
import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  first_name: string;
  last_name: string;
}

const initialValues: RegisterFormValues = {
  email: "",
  password: "",
  confirmPassword: "",
  first_name: "",
  last_name: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(5, "Password too short").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  first_name: Yup.string().required("First name is required").max(150, "First name too long"),
  last_name: Yup.string().required("Last name is required").max(150, "Last name too long"),
});

const Register: React.FC = () => {
  const [register, { isLoading }] = useCreateUserMutation();
  const navigate = useNavigate();

  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      const { confirmPassword, ...payload } = values;
      const res = await register(payload).unwrap();
      if (isSuccess(res?.status)) {
        Alert({
          type: "success",
          message: "Registration successful, please check your email to verify your account",
        });
        navigate("/login");
      }
    } catch (err: any) {
      Alert({
        type: "error",
        message: err?.data?.message || "Registration failed",
      });
    }
  };

  return (
    <div className='min-h-[calc(100vh-10rem)] flex items-center px-4 py-10 md:gap-x-10'>
      {/* Animated Illustration */}
      <motion.div
        className='hidden md:block w-1/2'
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img src='/welcome.png' alt='Register' className='w-fit h-auto' />
      </motion.div>

      {/* Animated Form Card */}
      <motion.div
        className='w-full max-w-md bg-white/80 backdrop-blur-lg border border-gray-200 shadow-xl rounded-2xl p-8'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2
          className='text-3xl font-bold text-center text-primary mb-2'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Create Account
        </motion.h2>
        <motion.p
          className='text-center text-gray-500 mb-6 text-sm'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Register a new account
        </motion.p>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isValid, dirty }) => (
            <Form className='space-y-5'>
              <motion.div
                className='flex flex-col md:flex-row md:space-x-4'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <InputField label='First Name' name='first_name' type='text' />
                <InputField label='Last Name' name='last_name' type='text' />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <InputField label='Email' name='email' type='email' />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <InputField label='Password' name='password' type='password' />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <InputField label='Confirm Password' name='confirmPassword' type='password' />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
              >
                <Button
                  type='submit'
                  variant='default'
                  size='lg'
                  className='w-full font-bold'
                  disabled={isLoading}
                >
                  {isLoading ? "Registering..." : "Register"}
                </Button>
              </motion.div>

              <motion.div
                className='flex items-center justify-center text-sm text-gray-600 mt-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                <span>Already have an account? </span>
                <Link to='/login' className='ml-1 text-primary hover:underline'>
                  Login
                </Link>
              </motion.div>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
};

export default Register;
