import React from "react";

interface Option {
  value: string | number;
  label: string;
}

interface SelectFieldProps {
  label: string;
  options: Option[];
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, options, value, onChange }) => {
  return (
    <div className='w-full mb-4'>
      <label className='block mb-1 text-foreground font-medium'>{label}</label>
      <select
        value={value}
        onChange={onChange}
        className='bg-white block w-full rounded-md px-3 py-2 shadow-sm border border-border text-foreground focus:outline-none focus:ring focus:ring-primary transition'
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
