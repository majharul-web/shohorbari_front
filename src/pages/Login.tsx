import FloatingLabelInput from "@/components/ui/form/FloatingLabelInput";
import { Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
// import { useLoginMutation } from "../store/api";

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
  password: Yup.string().min(6, "Password too short").required("Password is required"),
});

const Login: React.FC = () => {
  //   const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      //   const res = await login(values).unwrap();
      //   localStorage.setItem("token", res.token);
      console.log("Login successful", values);
      //   navigate("/dashboard");
    } catch (err: any) {
      alert(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='bg-white shadow-md rounded-lg p-8 w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center text-primary'>Login</h2>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form className='space-y-4'>
            {/* Email */}
            <FloatingLabelInput label='Email' name='email' type='email' />
            <FloatingLabelInput label='Password' name='password' type='password' />

            {/* Submit */}
            <button
              type='submit'
              className='w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition'
              //   disabled={isLoading}
            >
              Login
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
