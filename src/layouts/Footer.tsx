import React from "react";
import { Separator } from "@/components/ui/separator";

const Footer: React.FC = () => {
  return (
    <footer className='w-full border-t bg-white'>
      <div className='container mx-auto px-6 py-8 flex flex-col items-center justify-between gap-4 md:flex-row'>
        {/* Branding */}
        <p className='text-sm text-gray-500 text-center md:text-left'>
          © {new Date().getFullYear()} <span className='font-semibold'>MyBrand</span>. All rights reserved.
        </p>

        {/* Links */}
        <div className='flex items-center gap-6 text-sm text-gray-500'>
          <a href='/privacy' className='hover:text-primary transition-colors'>
            Privacy Policy
          </a>
          <Separator orientation='vertical' className='h-4' />
          <a href='/terms' className='hover:text-primary transition-colors'>
            Terms of Service
          </a>
          <Separator orientation='vertical' className='h-4' />
          <a href='/contact' className='hover:text-primary transition-colors'>
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
