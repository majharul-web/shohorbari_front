import Icon from "@/components/icons/Icon";
import { Separator } from "@/components/ui/separator";
import { APP_CONFIG } from "@/helpers/config/appconfig";
import { mdiFacebook, mdiInstagram, mdiLinkedin, mdiTwitter } from "@mdi/js";
import { motion } from "framer-motion";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className='w-full bg-background text-foreground border-t border-border'>
      {/* Top Section: Address, Contact, Social */}
      <div className='max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between gap-3 md:gap-6'>
        {/* Office Address */}
        <div className='flex-1'>
          <h3 className='text-lg font-semibold mb-2'>Office Address</h3>
          <p className='text-sm text-muted-foreground'>{APP_CONFIG.ADDRESS}</p>
        </div>

        {/* Contact Info */}
        <div className='flex-1'>
          <h3 className='text-lg font-semibold mb-2'>Contact Info</h3>
          <p className='text-sm text-muted-foreground'>
            Email Address:{" "}
            <a href='mailto:sales@aerotrip.net' className='hover:text-primary'>
              {APP_CONFIG.EMAIL}
            </a>
            <br />
            Mobile Number:{" "}
            <a href={`tel:${APP_CONFIG.PHONE}`} className='hover:text-primary'>
              {APP_CONFIG.PHONE}
            </a>
          </p>
        </div>

        {/* Social Media */}
        <div className='flex gap-3 md:gap-4 mt-4 md:mt-0 justify-start md:justify-end'>
          {[mdiFacebook, mdiTwitter, mdiLinkedin, mdiInstagram].map((icon, idx) => (
            <motion.a
              key={idx}
              href='#'
              aria-label='Social Link'
              className='w-10 h-10 md:w-12 md:h-12 flex justify-center items-center rounded-full border border-gray-300 hover:bg-primary hover:text-white transition'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon path={icon} size={22} />
            </motion.a>
          ))}
        </div>
      </div>

      {/* Middle Section: Payment + Links */}
      <div className='max-w-7xl mx-auto px-6 py-3 md:py-6 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-10'>
        {/* Payment Banner */}
        <div className='w-full md:w-1/2 flex flex-col md:flex-row md:items-center gap-3'>
          <h3 className='text-lg font-semibold'>We Accept</h3>
          <img className='max-w-full h-auto md:ml-4' src='/sslcommerz_banner.png' alt='Payment Methods' />
        </div>

        {/* Links */}
        <div className='flex flex-wrap gap-3 md:gap-6 text-sm text-muted-foreground items-center'>
          <a href='/privacy' className='hover:text-primary transition-colors'>
            Privacy Policy
          </a>
          <Separator orientation='vertical' className='h-4 hidden md:block' />
          <a href='/terms' className='hover:text-primary transition-colors'>
            Terms of Service
          </a>
          <Separator orientation='vertical' className='h-4 hidden md:block' />
          <a href='/contact' className='hover:text-primary transition-colors'>
            Contact
          </a>
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className='border-t border-border mt-6'>
        <p className='text-center text-sm text-muted-foreground py-4'>
          © {new Date().getFullYear()}.{" "}
          <span className='font-semibold text-primary'>{APP_CONFIG.APP_NAME}</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
