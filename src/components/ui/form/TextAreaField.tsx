import { Field, ErrorMessage } from "formik";
import React from "react";

interface TextAreaFieldProps {
  label: string;
  name: string;
  rows?: number;
  placeholder?: string;
  value?: string; // for controlled usage (outside Formik)
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // external onChange
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  name,
  rows = 5,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className='w-full mb-4'>
      <label htmlFor={name} className='block mb-1 text-foreground font-medium'>
        {label}
      </label>

      {/* Formik-aware Field */}
      <Field name={name}>
        {({ field }: any) => (
          <textarea
            {...field}
            id={name}
            rows={rows}
            placeholder={placeholder}
            value={value ?? field.value}
            onChange={(e) => {
              field.onChange(e); // ✅ Formik internal
              if (onChange) onChange(e); // ✅ external handler
            }}
            className='block w-full rounded-md px-3 py-2 shadow-sm border border-border focus:outline-none focus:border-primary transition resize-none'
          />
        )}
      </Field>

      <ErrorMessage name={name} component='div' className='text-destructive text-sm mt-1' />
    </div>
  );
};

export default TextAreaField;
