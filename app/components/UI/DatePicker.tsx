import React from 'react';
import "@/app/ui/styles/ui-components/TextInput.scss";

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
  className?: string;
  error?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({ label, value, onChange, placeholder = '', required = false, errorMessage = '', className = '', error = false}) => {
  return (
    <div className={`custom-datepicker ${className}`}>
      <label className="datepicker-label">
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
      <div className='datepicker-block'>
        <div className='datepicker-days'>
          <div className='day'>1</div>
          <div className='day'>2</div>
          <div className='day'>3</div>
          <div className='day'>4</div>
          <div className='day'>5</div>
        </div>
        <div className='datepicker-months'>
          <div className='month'>6</div>
          <div className='month'>7</div>
          <div className='month'>8</div>
          <div className='month'>9</div>
          <div className='month'>10</div>
        </div>
        <div className='datepicker-years'>
          <div className='years'>1978</div>
          <div className='years'>1979</div>
          <div className='years'>1980</div>
          <div className='years'>1981</div>
          <div className='years'>1982</div>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;