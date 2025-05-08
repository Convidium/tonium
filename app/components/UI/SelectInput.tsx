import React, { useEffect, useRef, useState } from 'react';
import "@/app/ui/styles/ui-components/SelectInput.scss";
import ExpandSVG from '@/app/ui/icons/arrow-expand.svg';
import CrossSVG from '@/app/ui/icons/cross.svg';
import LoadingSVG from "@/app/ui/icons/LoadingCircle.svg";

interface SelectInputProps<OptionType> {
    label: string;
    value: string;
    onSelect: (value: string) => void;
    options: OptionType[];
    loading: boolean;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    errorMessage?: string;
    className?: string;
    error?: boolean;
}

const SelectInput = <OptionType,>({
    label,
    value,
    onSelect,
    onChange,
    options,
    loading,
    placeholder = '',
    required = false,
    errorMessage = '',
    className = '',
    error = false,
}: SelectInputProps<OptionType>) => {
    const [isActive, setIsActive] = useState(false);
    const blockRef = useRef<HTMLDivElement>(null);

    const toggleVisibility = (state?: boolean) => {
        setIsActive(state !== undefined ? state : !isActive);
    };

    const [isSelected, setIsSelected] = useState(false);
    const [selectedElement, setSelectedElement] = useState<OptionType | null>(null);
    const handleSelect = (option: OptionType) => {
        setSelectedElement(option);
        setIsSelected(true);
        toggleVisibility(false);
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (blockRef.current && !blockRef.current.contains(event.target as Node)) {
            setIsActive(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={`custom-select-input ${className}`} ref={blockRef}>
            <label className="input-label">
                {label}
                {required && <span className="required-star">*</span>}
                {error && <span className="error-message">{errorMessage}</span>}
            </label>
            <div className='select-input-wrapper'>
                {
                    isSelected ?
                        <div className='selected-filed'>
                            <span>Selected option</span>
                            <CrossSVG />
                        </div>
                        :
                        <input
                            type="text"
                            value={value}
                            placeholder={placeholder}
                            onChange={(e) => { onChange(e.target.value), toggleVisibility(true) }}
                            className={`input-field ${error ? 'input-error' : ''}`}
                        />
                }
                <button className={'expand-button' + (isActive ? ' active' : '')} onClick={() => toggleVisibility()}>
                    <ExpandSVG />
                </button>
            </div>
            <div className={'select-input-block' + (isActive ? ' list-visible' : ' list-unvisible')}>
                <button className='select-input-create' onClick={() => selectElement()}> Create new option +</button>
                <div className='select-input-list'>
                    {options.map((option: OptionType) => (
                        <div
                            key={option.artist_id}
                            className='list-option'
                            onClick={() => selectOption(option)}
                        >
                            {option.artist_name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SelectInput;