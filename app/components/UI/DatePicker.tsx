import React, { useEffect, useRef, useState } from 'react';
import "@/app/ui/styles/ui-components/Datepicker.scss";
import Scroller from "@/app/components/UI/Scroller";
import DPInput from "@/app/components/UI/DatepickerInput";
import { MIN_YEAR, MAX_YEAR } from '@/app/configs/constants';


interface DatePickerProps {
  label: string;
  prevDate: string;
  onSelect: (value: string) => void;
  required?: boolean;
  className?: string;
  errorMessage?: string;
  isError?: boolean;
}

const fullYearNow = (new Date).getFullYear();
const monthNow = (new Date).getMonth();
const dayNow = (new Date).getDate();

const DatePicker: React.FC<DatePickerProps> = ({ label, prevDate, onSelect, required = false, className = '', errorMessage = '', isError = false }) => {
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

  const parsePrevDate = (date: string) => {
    const dateArr = date.split("-");
    if (dateArr.length === 3) {
      setCurrentDay(dateArr[0]);
      setCurrentMonth(dateArr[1]);
      setCurrentYear(dateArr[2]);
    }
  };

  useEffect(() => {
    parsePrevDate(prevDate);
  }, [])

  useEffect(() => {
    const newDate = `${currentDay}-${currentMonth}-${currentYear}`;
    onSelect(newDate);
  }, [currentDay, currentMonth, currentYear]);

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
        isCalendarOpen={isCalendarOpen}
        setIsCalendarOpen={setIsCalendarOpen}
        setCurrentDay={setCurrentDay}
        setCurrentMonth={setCurrentMonth}
        setCurrentYear={setCurrentYear}
        required={required}
        isError={isError}
        errorMessage={errorMessage}
        className={className}
        maxYear={MAX_YEAR}
        minYear={MIN_YEAR}
      />
      <div className={`datepicker-selector-block w-300-cor-05 ${isCalendarOpen ? 'list-visible' : 'list-unvisible'}`}>
        <Scroller dataFrom={1} dataTo={31} currentValue={currentDay} onValueChange={setCurrentDay} debounceDelay={300} />
        <Scroller dataFrom={1} dataTo={12} currentValue={currentMonth} onValueChange={setCurrentMonth} debounceDelay={300} />
        <Scroller dataFrom={MIN_YEAR} dataTo={MAX_YEAR} currentValue={currentYear} onValueChange={setCurrentYear} debounceDelay={300} />
      </div>
    </div>
  );
};

export default DatePicker;