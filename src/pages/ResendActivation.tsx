import { Alert } from "@/components/ui/alert/Alert";
import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/form/InputField";
import { useResendActivationMutation } from "@/redux/api/authApi";
import { isSuccess } from "@/utils/common";
import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

// ✅ Validation Schema
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
});

const ResendActivation: React.FC = () => {
  const [resendActivation, { isLoading }] = useResendActivationMutation();

  const initialValues = { email: "" };
  const navigate = useNavigate();

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: import("formik").FormikHelpers<typeof initialValues>
  ) => {
    try {
      const res = await resendActivation(values).unwrap();
      if (isSuccess(res.status)) {
        Alert({
          type: "success",
          message: "Activation link has been sent to your email.",
        });
      }
      resetForm();
      navigate("/login");
    } catch (err: any) {
      Alert({
        type: "error",
        message: err?.data?.detail || "Failed to resend activation link.",
      });
    }
  };

  return (
    <div className='min-h-[calc(100vh-10rem)] flex flex-col-reverse md:flex-row items-center py-10 md:py-0 gap-10'>
      {/* Left Image Section */}
      <motion.div
        className='hidden md:block w-1/2'
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img src='/email_activation.png' alt='Resend Activation' className='w-fit h-auto' />
      </motion.div>

      {/* Resend Activation Card */}
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
          Resend Activation Link
        </motion.h2>

        <motion.p
          className='text-center text-gray-500 mb-6 text-sm'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Enter your email to receive a new activation link
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Button type='submit' size='lg' className='w-full font-bold' disabled={isLoading}>
                  {isLoading ? "Sending..." : "Resend Activation Link"}
                </Button>
              </motion.div>

              <motion.div
                className='flex items-center justify-center text-sm text-gray-600 mt-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <Link to='/login' className='hover:text-primary'>
                  Back to Login
                </Link>
              </motion.div>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
};

export default ResendActivation;
