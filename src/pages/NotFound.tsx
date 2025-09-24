import { motion } from "framer-motion";
import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-150px)] px-4 text-foreground'>
      {/* Animated 404 */}
      <motion.h1
        className='text-9xl font-extrabold text-primary md:text-[12rem] md:leading-[12rem] text-center'
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
      >
        404
      </motion.h1>

      {/* Animated title */}
      <motion.p
        className='text-2xl md:text-3xl mt-4 font-semibold text-center'
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Oops! Page Not Found
      </motion.p>

      {/* Animated description */}
      <motion.p
        className='text-muted-foreground mt-2 max-w-md text-center'
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        The page you are looking for does not exist or has been moved.
      </motion.p>

      {/* Animated button */}
      <motion.button
        onClick={() => window.history.back()}
        className='mt-6 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition'
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
      >
        Go Back
      </motion.button>
    </div>
  );
};

export default NotFound;
