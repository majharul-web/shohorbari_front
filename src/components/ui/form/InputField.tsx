import Icon from "@/components/icons/Icon";
import { mdiEyeOffOutline, mdiEyeOutline } from "@mdi/js";
import type { FieldHookConfig } from "formik";
import { ErrorMessage, Field } from "formik";
import React, { useState } from "react";

interface InputFieldProps extends FieldHookConfig<string> {
  label: string;
  type?: string;
  name: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type = "text", name, ...fieldProps }) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className='w-full mb-4'>
      <label htmlFor={name} className='block mb-1 text-foreground font-medium'>
        {label}
      </label>

      <div className='relative'>
        <Field
          type={inputType}
          name={name}
          {...fieldProps}
          id={name}
          className='block w-full rounded-md px-3 py-2 shadow-sm border border-border focus:outline-none focus:border-primary  transition'
        />

        {/* Show/hide toggle for password */}
        {isPassword && (
          <span onClick={() => setShowPassword(!showPassword)} className='cursor-pointer'>
            <Icon
              path={showPassword ? mdiEyeOutline : mdiEyeOffOutline}
              w='w-10'
              h='h-12'
              size={22}
              className='absolute top-0 right-0 z-10 text-muted-foreground cursor-pointer'
            />
          </span>
        )}
      </div>

      <ErrorMessage name={name} component='div' className='text-destructive text-sm mt-1' />
    </div>
  );
};

export default InputField;
