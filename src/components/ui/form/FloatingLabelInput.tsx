import type { FieldHookConfig } from "formik";
import { ErrorMessage, Field } from "formik";
import React, { useState } from "react";

interface FloatingLabelInputProps extends FieldHookConfig<string> {
  label: string;
  type?: string;
  name: string;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  type = "text",
  name,
  ...fieldProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className='relative w-full'>
      <Field
        type={inputType}
        name={name}
        {...fieldProps}
        className='peer block w-full rounded-md border border-gray-300 bg-transparent px-3 pt-5 pb-2 text-gray-900 placeholder-transparent focus:border-primary focus:ring-1 focus:ring-primary'
        placeholder={label}
        id={name}
      />

      <label
        htmlFor={name}
        className='absolute left-3 top-0 text-gray-400 text-sm transition-all 
                   peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 
                   peer-placeholder-shown:text-base peer-focus:top-2.5 peer-focus:text-sm peer-focus:text-primary'
      >
        {label}
      </label>

      {/* Show/hide toggle */}
      {isPassword && (
        <button
          type='button'
          onClick={() => setShowPassword(!showPassword)}
          className='absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500'
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      )}

      <ErrorMessage name={name} component='div' className='text-red-500 text-sm mt-1' />
    </div>
  );
};

export default FloatingLabelInput;
