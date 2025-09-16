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
    <div className='min-h-[calc(100vh-10rem)] flex items-center justify-center px-4'>
      <div className='w-full max-w-md bg-white/80 backdrop-blur-lg border border-gray-200 shadow-xl rounded-2xl p-8'>
        <h2 className='text-3xl font-bold text-center text-primary mb-2'>Welcome Back</h2>
        <p className='text-center text-gray-500 mb-6 text-sm'>Please sign in to your account</p>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isValid, dirty }) => (
            <Form className='space-y-5'>
              <InputField label='Email' name='email' type='email' />
              <InputField label='Password' name='password' type='password' />

              <Button
                type='submit'
                variant='default'
                size='lg'
                className='w-full'
                disabled={isLoading || !(isValid && dirty)}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>

              <div className='flex items-center justify-between text-sm text-gray-600 mt-4'>
                <Link to='/forgot-password' className='hover:text-primary'>
                  Forgot password?
                </Link>
                <Link to='/register' className='hover:text-primary'>
                  Create account
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
