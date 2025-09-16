import { Separator } from "@/components/ui/separator";
import { APP_CONFIG } from "@/helpers/config/appconfig";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className='w-full border-t border-border bg-background'>
      <div className='max-w-7xl mx-auto px-6 py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-4'>
        {/* Branding */}
        <p className='text-sm text-muted-foreground text-center md:text-left'>
          © {new Date().getFullYear()}{" "}
          <span className='font-semibold text-primary'>{APP_CONFIG.APP_NAME}</span>. All rights reserved.
        </p>

        {/* Links */}
        <div className='flex items-center gap-4 md:gap-6 text-sm text-muted-foreground'>
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
