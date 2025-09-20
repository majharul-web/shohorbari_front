import { motion } from "framer-motion";
import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className='min-h-screen bg-gray px-4 md:px-20 py-12 my-4'>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='max-w-4xl mx-auto space-y-8'
      >
        <p className='text-lg md:!text-3xl font-bold text-primary'>Privacy Policy</p>
        <p className='text-muted-foreground'>
          Your privacy is important to us. This Privacy Policy explains how{" "}
          <span className='font-medium text-foreground'>HomeEase</span> collects, uses, and protects your
          information when you use our website and services.
        </p>

        <div className='space-y-6'>
          <section>
            <h2 className='text-xl md:text-2xl font-semibold text-primary mb-2'>1. Information We Collect</h2>
            <p className='text-muted-foreground'>
              We may collect personal information such as your name, email, phone number, and property details
              when you interact with our platform.
            </p>
          </section>

          <section>
            <h2 className='text-xl md:text-2xl font-semibold text-primary mb-2'>2. How We Use Information</h2>
            <p className='text-muted-foreground'>
              The information we collect is used to improve our services, process transactions, verify
              property listings, and communicate with you regarding your account or inquiries.
            </p>
          </section>

          <section>
            <h2 className='text-xl md:text-2xl font-semibold text-primary mb-2'>3. Data Protection</h2>
            <p className='text-muted-foreground'>
              We implement strict security measures to protect your personal data from unauthorized access,
              alteration, or disclosure. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className='text-xl md:text-2xl font-semibold text-primary mb-2'>4. Sharing of Information</h2>
            <p className='text-muted-foreground'>
              We do not sell or rent your personal information. We may share information only with trusted
              service providers or if required by law.
            </p>
          </section>

          <section>
            <h2 className='text-xl md:text-2xl font-semibold text-primary mb-2'>5. Your Rights</h2>
            <p className='text-muted-foreground'>
              You have the right to access, update, or delete your personal data. Please contact us if you
              wish to exercise these rights.
            </p>
          </section>

          <section>
            <h2 className='text-xl md:text-2xl font-semibold text-primary mb-2'>
              6. Updates to Privacy Policy
            </h2>
            <p className='text-muted-foreground'>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page
              with an updated effective date.
            </p>
          </section>
        </div>

        <p className='text-sm text-muted-foreground mt-10'>Last updated: {new Date().toLocaleDateString()}</p>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
