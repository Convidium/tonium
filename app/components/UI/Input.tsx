import React from 'react';
import "@/app/ui/styles/ui-components/TextInput.scss";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
  className?: string;
  error?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ label, value, onChange, placeholder = '', required = false, errorMessage = '', className = '', error = false}) => {
  return (
    <div className={`custom-text-input ${className}`}>
      <label className="input-label">
        {label}
        {required && <span className="required-star">*</span>}
        {error && <span className="error-message">{errorMessage}</span>}
      </label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`input-field ${error ? 'input-error' : ''}`}
      />
    </div>
  );
};

export default TextInput;