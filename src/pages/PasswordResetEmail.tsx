import { Alert } from "@/components/ui/alert/Alert";
import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/form/InputField";
import { useResetPasswordEmailMutation } from "@/redux/api/authApi";
import { toCapitalizeString } from "@/utils/common";
import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";

interface PasswordResetFormValues {
  email: string;
}

const initialValues: PasswordResetFormValues = {
  email: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const PasswordResetEmail: React.FC = () => {
  const [sendResetEmail, { isLoading }] = useResetPasswordEmailMutation();
  const navigate = useNavigate();

  const handleSubmit = async (
    values: PasswordResetFormValues,
    { resetForm }: import("formik").FormikHelpers<typeof initialValues>
  ) => {
    try {
      const res: any = await sendResetEmail(values).unwrap();
      Alert({
        type: "success",
        message: res?.message || "Password reset email sent successfully.",
      });
      resetForm();
      navigate("/login");
    } catch (err: any) {
      Alert({
        type: "error",
        message: toCapitalizeString(err?.data?.detail || "Failed to send reset email"),
      });
    }
  };

  return (
    <div className='min-h-[calc(100vh-10rem)] flex items-center py-10 md:py-0 bg-background'>
      {/* Left Image Section */}
      <motion.div
        className='hidden md:block w-1/2'
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img src='/email_activation.png' alt='Password Reset' className='w-fit h-auto' />
      </motion.div>

      {/* Form Card */}
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
          Reset Password
        </motion.h2>
        <motion.p
          className='text-center text-gray-500 mb-6 text-sm'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Enter your email to receive a password reset link
        </motion.p>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {() => (
            <Form className='space-y-5'>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <InputField label='Email' name='email' type='email' />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  type='submit'
                  variant='default'
                  size='lg'
                  className='w-full font-bold'
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </motion.div>

              <motion.div
                className='flex items-center justify-center text-sm text-gray-600 mt-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <span>Remembered your password? </span>
                <a href='/login' className='ml-1 text-primary hover:underline'>
                  Login
                </a>
              </motion.div>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
};

export default PasswordResetEmail;
