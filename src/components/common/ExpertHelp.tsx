import { motion } from "framer-motion";
import { ArrowUpRight, Phone } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom"; // or next/link if Next.js

const ExpertHelp: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='w-full bg-muted rounded-2xl py-12 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6'
    >
      {/* Left content */}
      <div className='space-y-2 text-center md:text-left'>
        <h2 className='text-2xl md:text-3xl font-bold text-foreground'>Need help? Talk to our expert.</h2>
        <p className='text-muted-foreground'>Talk to our experts or browse through more properties.</p>
      </div>

      {/* Right actions */}
      <div className='flex items-center gap-4'>
        {/* Contact Us Button */}
        <Link to='/contact'>
          <button className='flex items-center gap-2 px-5 py-2.5 rounded-lg border border-foreground text-foreground font-medium hover:bg-primary/10 transition'>
            Contact Us <ArrowUpRight size={18} />
          </button>
        </Link>

        {/* Phone Button */}
        <a href='tel:9208519087'>
          <button className='flex items-center gap-2 px-5 py-2.5 rounded-lg bg-foreground text-background font-semibold shadow hover:opacity-90 transition'>
            <Phone size={18} /> 920 851 9087
          </button>
        </a>
      </div>
    </motion.div>
  );
};

export default ExpertHelp;
