import Icon from "@/components/icons/Icon";
import { Alert } from "@/components/ui/alert/Alert";
import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/form/InputField";
import { APP_CONFIG } from "@/helpers/config/appconfig";
import {
  mdiEmail,
  mdiFacebook,
  mdiInstagram,
  mdiLinkedin,
  mdiMapMarker,
  mdiPhone,
  mdiTwitter,
} from "@mdi/js";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import React from "react";
import * as Yup from "yup";

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  message: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  message: Yup.string().required("Message is required").min(10, "Message too short"),
});

const Contact: React.FC = () => {
  const handleSubmit = async (values: ContactFormValues) => {
    try {
      console.log("Contact Form Submitted:", values);
      Alert({
        type: "success",
        message: "Your message has been sent successfully!",
      });
    } catch (err: any) {
      Alert({
        type: "error",
        message: "Something went wrong, please try again later",
      });
    }
  };

  return (
    <div className='min-h-[calc(100vh-10rem)] flex flex-col md:flex-row items-center justify-between px-4 md:px-0 py-12 gap-10'>
      {/* Company Info Section */}
      <motion.div
        className='w-full md:w-1/2 space-y-6'
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className='text-4xl font-bold text-primary'>Get in Touch</h2>
        <p className='text-gray-600 max-w-md'>
          Have questions, feedback, or partnership ideas? Reach out to us — we’d love to hear from you!
        </p>

        <div className='space-y-4'>
          <div className='flex items-center space-x-3'>
            <Icon path={mdiMapMarker} size={24} className='text-primary' />
            <span>{APP_CONFIG.ADDRESS}</span>
          </div>
          <div className='flex items-center space-x-3'>
            <Icon path={mdiEmail} size={24} className='text-primary' />
            <span>{APP_CONFIG.EMAIL}</span>
          </div>
          <div className='flex items-center space-x-3'>
            <Icon path={mdiPhone} size={24} className='text-primary' />
            <span>{APP_CONFIG.PHONE}</span>
          </div>
        </div>

        {/* Social Media Links */}
        <div className='flex space-x-4 mt-6'>
          {[mdiFacebook, mdiTwitter, mdiLinkedin, mdiInstagram].map((icon, idx) => (
            <motion.a
              key={idx}
              href='#'
              className='w-12 h-12 flex justify-center items-center rounded-full border border-gray-300 hover:bg-primary hover:text-white transition'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon path={icon} size={22} />
            </motion.a>
          ))}
        </div>

        {/* Google Map Embed */}
        <motion.div
          className='mt-8 rounded-xl overflow-hidden shadow-lg border border-gray-200'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <iframe
            title='Company Location'
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9022452262924!2d90.39945231543163!3d23.75088579459152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b86b8c8c4f%3A0xd8e28b8288b1a6cf!2sDhaka!5e0!3m2!1sen!2sbd!4v1695116931663!5m2!1sen!2sbd'
            width='100%'
            height='250'
            loading='lazy'
            allowFullScreen
            className='rounded-xl'
          ></iframe>
        </motion.div>
      </motion.div>

      {/* Contact Form Section */}
      <motion.div
        className='w-full max-w-md bg-white/80 backdrop-blur-lg border border-gray-200 shadow-xl rounded-2xl p-8'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isValid, dirty, isSubmitting }) => (
            <Form className='space-y-5'>
              <InputField label='Your Name' name='name' type='text' />
              <InputField label='Email Address' name='email' type='email' />

              {/* Message Textarea */}
              <div>
                <label htmlFor='message' className='block mb-1 text-foreground font-medium'>
                  Message
                </label>
                <Field
                  as='textarea'
                  name='message'
                  id='message'
                  rows={5}
                  className='block w-full rounded-md px-3 py-2 shadow-sm border border-border focus:outline-none focus:border-primary transition resize-none'
                />
                <ErrorMessage name='message' component='div' className='text-destructive text-sm mt-1' />
              </div>

              <Button
                type='submit'
                variant='default'
                size='lg'
                className='w-full font-bold'
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
};

export default Contact;
