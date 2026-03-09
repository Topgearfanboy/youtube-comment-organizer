import React from "react";

interface FieldProps {
  label: string;
  children: React.ReactNode;
}

export const Field: React.FC<FieldProps> = ({ label, children }) => (
  <div className="mb-4">
    <label className="text-white/50 text-[10px] uppercase tracking-widest block mb-1.5">
      {label}
    </label>
    {children}
  </div>
);
