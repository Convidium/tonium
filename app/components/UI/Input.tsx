import React from 'react';
import "@/app/ui/styles/ui-components/TextInput.scss";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  errorMessage?: string;
  isError?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ label, value, onChange, placeholder = '', required = false, className = '', errorMessage = '', isError = false }) => {
  return (
    <div className={`custom-text-input ${className}`}>
      <label className="input-label">
        <span>
          {label}
          {required && <span className="required-star">*</span>}
        </span>
        {isError && <span className="error-message">{errorMessage}</span>}
      </label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`input-field ${isError ? 'input-error' : ''}`}
      />
    </div>
  );
};

export default TextInput;