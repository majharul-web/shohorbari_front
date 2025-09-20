import { motion } from "framer-motion";
import React from "react";

const TermsOfService: React.FC = () => {
  return (
    <div className='min-h-screen bg-gray  px-4 md:px-20 py-12 my-4'>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='max-w-4xl mx-auto space-y-8'
      >
        <p className='text-lg md:!text-3xl font-bold text-primary'>Terms of Service</p>
        <p className='text-muted-foreground'>
          Welcome to <span className='font-medium text-foreground'>HomeEase</span>. By using our website and
          services, you agree to comply with and be bound by the following Terms of Service. Please read them
          carefully.
        </p>

        <div className='space-y-6'>
          <section>
            <h2 className='text-xl md:text-2xl font-semibold text-primary mb-2'>1. Acceptance of Terms</h2>
            <p className='text-muted-foreground'>
              By accessing or using our platform, you confirm that you accept these terms and agree to abide
              by them. If you do not agree, you must not use our services.
            </p>
          </section>

          <section>
            <h2 className='text-xl md:text-2xl font-semibold text-primary mb-2'>2. User Responsibilities</h2>
            <p className='text-muted-foreground'>
              You agree to provide accurate information when creating an account or listing a property. You
              are responsible for maintaining the confidentiality of your account and activities under your
              account.
            </p>
          </section>

          <section>
            <h2 className='text-xl md:text-2xl font-semibold text-primary mb-2'>3. Property Listings</h2>
            <p className='text-muted-foreground'>
              All property listings must be truthful and comply with applicable laws. We reserve the right to
              remove any content that is misleading, illegal, or violates our policies.
            </p>
          </section>

          <section>
            <h2 className='text-xl md:text-2xl font-semibold text-primary mb-2'>
              4. Limitation of Liability
            </h2>
            <p className='text-muted-foreground'>
              We strive to ensure the accuracy of our listings but cannot guarantee the completeness or
              reliability of property information. We are not liable for any damages resulting from the use of
              our platform.
            </p>
          </section>

          <section>
            <h2 className='text-xl md:text-2xl font-semibold text-primary mb-2'>5. Changes to Terms</h2>
            <p className='text-muted-foreground'>
              We may update these Terms of Service at any time. Continued use of our platform indicates
              acceptance of any changes.
            </p>
          </section>
        </div>

        <p className='text-sm text-muted-foreground mt-10'>Last updated: {new Date().toLocaleDateString()}</p>
      </motion.div>
    </div>
  );
};

export default TermsOfService;
