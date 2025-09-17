import { Alert } from "@/components/ui/alert/Alert";
import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/form/InputField";
import { authKey } from "@/constant/storageKey";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { toCapitalizeString } from "@/utils/common";
import { setToCookie } from "@/utils/cookie";
import { Form, Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { motion } from "framer-motion";

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(5, "Password too short").required("Password is required"),
});

const Login: React.FC = () => {
  const [login, { isLoading }] = useUserLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (
    values: LoginFormValues,
    { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const res = await login(values).unwrap();
      setToCookie(authKey, res.access);
      navigate("/dashboard");
      resetForm();
    } catch (err: any) {
      console.log("Error:", err);
      const errorMessage = err?.data?.detail || "Login failed";
      Alert({
        type: "error",
        message: `${toCapitalizeString(errorMessage)}` || "Something went wrong",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='min-h-[calc(100vh-10rem)] flex items-center px-4 py-10 md:py-0'>
      {/* Left Image Section with animation */}
      <motion.div
        className='hidden md:block w-1/2'
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img src='/public/login.png' alt='Login Illustration' className='w-fit h-auto' />
      </motion.div>

      {/* Login Card with animation */}
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
          Welcome Back
        </motion.h2>
        <motion.p
          className='text-center text-gray-500 mb-6 text-sm'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Please sign in to your account
        </motion.p>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isValid, dirty }) => (
            <Form className='space-y-5'>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <InputField label='Email' name='email' type='email' />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <InputField label='Password' name='password' type='password' />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 }}
              >
                <Button
                  type='submit'
                  variant='default'
                  size='lg'
                  className='w-full font-bold'
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </motion.div>

              <motion.div
                className='flex items-center justify-between text-sm text-gray-600 mt-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <Link to='/forgot-password' className='hover:text-primary'>
                  Forgot password?
                </Link>
                <Link to='/register' className='hover:text-primary'>
                  Create account
                </Link>
              </motion.div>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
};

export default Login;
