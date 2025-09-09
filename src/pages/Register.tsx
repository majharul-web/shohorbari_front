import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/form/InputField";
import { useCreateUserMutation } from "@/redux/api/authApi"; // create this RTK Query endpoint
import { Form, Formik } from "formik";
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
      const { confirmPassword, ...payload } = values; // remove confirmPassword
      const res = await register(payload).unwrap();
      console.log("Response:", res);
      navigate("/login");
    } catch (err: any) {
      alert(err?.data?.message || "Registration failed");
    }
  };

  return (
    <div className='min-h-[calc(100vh-10rem)] flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-6'>
      <div className='w-full max-w-md bg-white/80 backdrop-blur-lg border border-gray-200 shadow-xl rounded-2xl p-8'>
        <h2 className='text-3xl font-bold text-center text-primary mb-2'>Create Account</h2>
        <p className='text-center text-gray-500 mb-6 text-sm'>Register a new account</p>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isValid, dirty }) => (
            <Form className=''>
              <div className='flex flex-col md:flex-row md:space-x-4'>
                <InputField label='First Name' name='first_name' type='text' />
                <InputField label='Last Name' name='last_name' type='text' />
              </div>
              <InputField label='Email' name='email' type='email' />
              <InputField label='Password' name='password' type='password' />
              <InputField label='Confirm Password' name='confirmPassword' type='password' />

              <Button
                type='submit'
                variant='default'
                size='lg'
                className='w-full'
                disabled={isLoading || !(isValid && dirty)}
              >
                {isLoading ? "Registering..." : "Register"}
              </Button>

              <div className='flex items-center justify-center text-sm text-gray-600 mt-4'>
                <span>Already have an account? </span>
                <Link to='/login' className='ml-1 text-primary hover:underline'>
                  Login
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
