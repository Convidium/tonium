import React, { useRef, useState } from 'react';
import "@/app/ui/styles/ui-components/Datepicker.scss";
import Scroller from "@/app/components/UI/Scroller";
import DPInput from "@/app/components/UI/DatepickerInput";

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  errorMessage?: string;
  className?: string;
  error?: boolean;
}

const fullYearNow = (new Date).getFullYear();
const monthNow = (new Date).getMonth();
const dayNow = (new Date).getDate();

const DatePicker: React.FC<DatePickerProps> = ({ label, value, onChange, required = false, errorMessage = '', className = '', error = false }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [currentDay, setCurrentDay] = useState<string>(dayNow.toString());
  const [currentMonth, setCurrentMonth] = useState<string>(monthNow.toString());
  const [currentYear, setCurrentYear] = useState<string>(fullYearNow.toString());
  
  const blockRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (blockRef.current && !blockRef.current.contains(event.target as Node)) {
      setIsCalendarOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className='datepicker-container' ref={blockRef}>
      <DPInput
        label={label}
        valueDay={currentDay}
        valueMonth={currentMonth}
        valueYear={currentYear}
        onChange={onChange}
        isCalendarOpen={isCalendarOpen}
        setIsCalendarOpen={setIsCalendarOpen}
        setCurrentDay={setCurrentDay}
        setCurrentMonth={setCurrentMonth}
        setCurrentYear={setCurrentYear}
        required={required}
        error={error}
        errorMessage={errorMessage}
        className={className}
        maxYear={fullYearNow}
        minYear={1900}
      />
      <div className={`datepicker-selector-block w-300-cor-05 ${isCalendarOpen ? 'list-visible' : 'list-unvisible'}`}>
        <Scroller dataFrom={1} dataTo={31} currentValue={currentDay} onValueChange={setCurrentDay} debounceDelay={300} />
        <Scroller dataFrom={1} dataTo={12} currentValue={currentMonth} onValueChange={setCurrentMonth} debounceDelay={300} />
        <Scroller dataFrom={1900} dataTo={fullYearNow} currentValue={currentYear} onValueChange={setCurrentYear} debounceDelay={300} />
      </div>
    </div>
  );
};

export default DatePicker;