'use client';
import React, { useEffect, useRef, useState } from 'react'
import "@/app/ui/styles/ui-components/DatepickerInput.scss";
import CaldenarSVG from "@/app/ui/icons/calendar.svg";
import { isNumber } from 'util';

interface DatepickerInputProps {
    label: string;
    valueDay: string;
    valueMonth: string;
    valueYear: string;
    maxYear: number;
    minYear: number;
    isCalendarOpen?: boolean;
    setIsCalendarOpen: (value: boolean) => void;
    setCurrentDay: (value: string) => void;
    setCurrentMonth: (value: string) => void;
    setCurrentYear: (value: string) => void;
    onChange: (value: string) => void;
    required?: boolean;
    errorMessage?: string;
    className?: string;
    error?: boolean;
}

const DatepickerInput: React.FC<DatepickerInputProps> = ({
    label, valueDay, valueMonth, valueYear, maxYear, minYear,
    setCurrentDay, setCurrentMonth, setCurrentYear,
    isCalendarOpen = false, setIsCalendarOpen, onChange,
    required = false, errorMessage = '', className = '', error = false }) => {
    const dayInput = useRef<HTMLInputElement>(null);
    const monthInput = useRef<HTMLInputElement>(null);
    const yearInput = useRef<HTMLInputElement>(null);

    const handleDayChange = (value: string) => {
        if (value !== value.trim()) return;
        const toNumber = Number(value);
        if (Number.isNaN(toNumber)) return;

        const daysInMonth = getDaysInMonth(Number(valueMonth), Number(valueYear));
        if (toNumber > daysInMonth) {
            monthInput.current?.focus();
            return;
        };

        if (value.length <= 2) {
            setCurrentDay(value);
        }
    }

    const handleMonthChange = (value: string) => {
        if (value !== value.trim()) return;
        const toNumber = Number(value);
        if (Number.isNaN(toNumber)) return;
        if (toNumber > 12) {
            yearInput.current?.focus();
            return;
        };

        if (value.length <= 2) {
            setCurrentMonth(value);
        }
    }

    const handleYearChange = (value: string) => {
        if (value !== value.trim()) return;
        const toNumber = Number(value);
        if (Number.isNaN(toNumber)) return;

        if (toNumber > maxYear) return;

        if (value.length <= 4) {
            setCurrentYear(value);
        }
    }

    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month, 0).getDate();
    }

    useEffect(() => {
        const listenDayInput = (e: any) => {
            if (e.key == "Enter" || e.key == " ") {
                monthInput.current?.focus();
                return;
            }
            if (e.key == "ArrowRight" && e.ctrlKey) {
                monthInput.current?.focus();
            }
        }
        if (dayInput && dayInput.current) {
            dayInput.current.addEventListener("keydown", listenDayInput)
            return () => {
                dayInput.current?.removeEventListener("keydown", listenDayInput)
            }
        }
    }, [dayInput])

    useEffect(() => {
        const listenMonthInput = (e: any) => {
            if (e.key == "Enter" || e.key == " ") {
                yearInput.current?.focus();
                return;
            }
            if (e.key == "ArrowLeft" && e.ctrlKey) {
                dayInput.current?.focus();
            } else if (e.key == "ArrowRight" && e.ctrlKey) {
                yearInput.current?.focus();
            }
        }
        if (monthInput && monthInput.current) {
            monthInput.current.addEventListener("keydown", listenMonthInput)
            return () => {
                monthInput.current?.removeEventListener("keydown", listenMonthInput)
            }
        }
    }, [monthInput])

    useEffect(() => {
        const listenMonthInput = (e: any) => {
            if (e.key == "ArrowLeft" && e.ctrlKey) {
                monthInput.current?.focus();
            }
        }
        if (yearInput && yearInput.current) {
            yearInput.current.addEventListener("keydown", listenMonthInput)
            return () => {
                yearInput.current?.removeEventListener("keydown", listenMonthInput)
            }
        }
    }, [yearInput])

    return (
        <div className={`custom-datepicker-input ${className}`}>
            <label className="input-label">
                {label}
                {required && <span className="required-star">*</span>}
                {error && <span className="error-message">{errorMessage}</span>}
            </label>
            <div className='date-input-block'>
                <input
                    type="text"
                    value={valueDay}
                    placeholder={"DD"}
                    onChange={(e) => handleDayChange(e.target.value)}
                    className={`input-field ${error ? 'input-error' : ''}`}
                    ref={dayInput}
                />
                <span>/</span>
                <input
                    type="text"
                    value={valueMonth}
                    placeholder={"MM"}
                    onChange={(e) => handleMonthChange(e.target.value)}
                    className={`input-field ${error ? 'input-error' : ''}`}
                    ref={monthInput}
                />
                <span>/</span>
                <input
                    type="text"
                    value={valueYear}
                    placeholder={"YYYY"}
                    onChange={(e) => handleYearChange(e.target.value)}
                    className={`input-field ${error ? 'input-error' : ''}`}
                    ref={yearInput}
                />
                <button className={`scroll-wheel-btn ${isCalendarOpen ? "active" : ""}`} onClick={() => setIsCalendarOpen(!isCalendarOpen)}><CaldenarSVG /></button>
            </div>
        </div>
    )
}

export default DatepickerInput;