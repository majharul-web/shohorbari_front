// PasswordResetConfirm.tsx
import { Alert } from "@/components/ui/alert/Alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InputField from "@/components/ui/form/InputField";
import { useResetPasswordConfirmMutation } from "@/redux/api/authApi";
import { isSuccess } from "@/utils/common";
import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

interface ResetFormValues {
  password: string;
  confirmPassword: string;
}

const initialValues: ResetFormValues = {
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  password: Yup.string().min(5, "Password too short").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const PasswordResetConfirm: React.FC = () => {
  const { uid, token } = useParams<{ uid: string; token: string }>();
  const [resetPasswordConfirm, { isLoading }] = useResetPasswordConfirmMutation();

  const [isSuccessFull, setIsSuccessFull] = useState<boolean | null>(null);

  const navigate = useNavigate();
  const handleSubmit = async (
    values: ResetFormValues,
    { resetForm }: import("formik").FormikHelpers<typeof initialValues>
  ) => {
    if (!uid || !token) {
      setIsSuccessFull(false);
      return;
    }

    try {
      const res: any = await resetPasswordConfirm({
        uid,
        token,
        new_password: values.password,
      }).unwrap();
      if (isSuccess(res?.status)) {
        resetForm();
        setIsSuccessFull(true);
        Alert({
          type: "success",
          message: res?.data?.message || "Password reset has been successfully!",
        });
        navigate("/login");
      }
    } catch (err: any) {
      const message = err?.data?.new_password?.[0] ?? err?.data?.token?.[0] ?? "Something went wrong";

      setIsSuccessFull(false);
      Alert({
        type: "error",
        message: message || "Something went wrong",
      });
    }
  };

  return (
    <div className='min-h-[calc(100vh-10rem)] flex flex-col-reverse md:flex-row items-center py-10 md:py-4 gap-10 bg-background'>
      {/* Left Image Section with animation */}
      <motion.div
        className='flex-1 hidden md:flex justify-center'
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img src='/login.png' alt='Password Reset' className='w-fit h-auto' />
      </motion.div>

      {/* Reset Card */}
      <motion.div
        className='flex-1 w-full max-w-md'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Card className='border border-border shadow-xl rounded-2xl bg-card'>
          <CardHeader className='text-center'>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <CardTitle
                className={` text-2xl font-bold ${
                  isSuccessFull
                    ? "text-green-600"
                    : isSuccessFull === false
                    ? "text-destructive"
                    : "text-primary"
                }`}
              >
                {isSuccessFull === true
                  ? "Password Reset Successful!"
                  : isSuccessFull === false
                  ? "Reset Failed"
                  : "Reset Your Password"}
              </CardTitle>
            </motion.div>
          </CardHeader>

          <CardContent className=' space-y-6 px-6'>
            {isSuccessFull !== true && (
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isValid, dirty }) => (
                  <Form className='space-y-5'>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <InputField label='New Password' name='password' type='password' />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <InputField label='Confirm Password' name='confirmPassword' type='password' />
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
                        {isLoading ? "Resetting..." : "Reset Password"}
                      </Button>
                    </motion.div>
                  </Form>
                )}
              </Formik>
            )}

            {isSuccessFull && (
              <motion.div
                className='flex justify-center'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Link to='/login' className='w-full'>
                  <Button className='w-full font-semibold'>Go to Login</Button>
                </Link>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PasswordResetConfirm;
