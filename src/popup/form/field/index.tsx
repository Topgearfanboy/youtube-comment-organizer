import React from "react";

interface FieldProps {
  label: string;
  children: React.ReactNode;
}

export const Field: React.FC<FieldProps> = ({ label, children }) => (
  <div className="mb-4">
    <label className="text-stone-600 text-[10px] uppercase tracking-widest block mb-1.5 font-semibold">
      {label}
    </label>
    {children}
  </div>
);
