import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

const About: React.FC = () => {
  const url1 = "https://i.pravatar.cc/40";
  const url2 = "https://i.pravatar.cc/41";
  const url3 = "https://i.pravatar.cc/42";
  return (
    <div className='min-h-screen flex flex-col items-center px-4 md:px-0 py-12 space-y-16'>
      {/* Hero Section */}
      <motion.div
        className='flex flex-col md:flex-row items-center gap-10 w-full'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className='md:w-1/2 space-y-6'>
          <h1 className='text-4xl md:text-5xl font-bold text-primary'>About Our House Rent Service</h1>
          <p className='text-gray-600 text-lg leading-relaxed'>
            We provide a trusted platform for finding your next home. Whether you’re looking to rent, lease,
            or list a property, our mission is to make the process simple, secure, and reliable.
          </p>
        </div>
        <div className='md:w-1/2'>
          {/* Demo image (replace with your own later) */}
          <img
            src='/home1.jpg'
            alt='House Rent'
            className='rounded-2xl shadow-xl w-full h-auto object-cover'
          />
        </div>
      </motion.div>

      {/* Mission / Story Section */}
      <motion.div
        className='text-center max-w-3xl space-y-6'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className='text-3xl font-semibold text-primary'>Our Mission</h2>
        <p className='text-gray-600 leading-relaxed'>
          At <span className='font-medium'>HomeEase</span>, we believe that finding the right home should be
          stress-free. Our platform connects renters with verified property owners, ensuring transparency,
          security, and convenience. With modern technology and a customer-first approach, we’re redefining
          the house rental experience.
        </p>
      </motion.div>

      {/* Values / Features */}
      <motion.div
        className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {[
          {
            title: "Verified Properties",
            desc: "Every listing is carefully checked to ensure accuracy and reliability.",
            icon: "🏡",
          },
          {
            title: "Trusted Support",
            desc: "Our support team is always ready to guide you through the process.",
            icon: "🤝",
          },
          {
            title: "Secure Process",
            desc: "Your safety and data privacy are our top priority at every step.",
            icon: "🔒",
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            className='bg-white/80 backdrop-blur-lg border border-gray-200 shadow-lg rounded-2xl p-6 text-center'
            whileHover={{ scale: 1.05 }}
          >
            <div className='text-4xl mb-4'>{item.icon}</div>
            <h3 className='text-xl font-semibold mb-2 text-primary'>{item.title}</h3>
            <p className='text-gray-600'>{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Team Section */}
      <motion.div
        className='w-full max-w-5xl space-y-8'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h2 className='text-3xl font-semibold text-center text-primary'>Meet Our Team</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {[
            {
              name: "Alice Johnson",
              role: "CEO",
            },
            {
              name: "Bob Smith",
              role: "CTO",
            },
            {
              name: "Catherine Lee",
              role: "COO",
            },
          ].map((member, index) => (
            <div
              key={index}
              className='bg-white/80 backdrop-blur-lg border border-gray-200 shadow-lg rounded-2xl p-6 text-center'
            >
              {/* Demo image (replace later) */}
              <img
                src={index === 0 ? url1 : index === 1 ? url2 : url3}
                alt='Team Member'
                className='w-fit  rounded-full mx-auto mb-4 object-contain shadow-md'
              />
              <h3 className='text-lg font-semibold text-primary'>{member.name}</h3>
              <p className='text-gray-500 text-sm'>{member.role}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA Footer */}
      <motion.div
        className='w-full bg-primary text-white rounded-2xl shadow-lg py-12 px-6 text-center'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <h2 className='text-3xl font-bold mb-4'>Ready to Find Your Dream Home?</h2>
        <p className='text-lg mb-6 text-white/90'>
          Let us help you discover the perfect property that matches your needs.
        </p>
        <Link
          to='/contact-us'
          className='inline-block bg-white text-primary font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 transition'
        >
          Find Your Home Today → Contact Us
        </Link>
      </motion.div>
    </div>
  );
};

export default About;
