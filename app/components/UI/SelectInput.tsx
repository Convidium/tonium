import React, { useEffect, useRef, useState } from 'react';
import "@/app/ui/styles/ui-components/SelectInput.scss";
import ExpandSVG from '@/app/ui/icons/arrow-expand.svg';
import CrossSVG from '@/app/ui/icons/cross.svg';
import LoadingSVG from "@/app/ui/icons/LoadingCircle.svg";

interface SelectInputProps<OptionType> {
    label: string;
    value: string;
    onSelect: (value: OptionType | null) => void;
    createNewOption: (label: string) => OptionType;
    selectedOptionName: string;
    options: OptionType[];
    loading: boolean;
    onChange: (value: string) => void;
    getOptionLabel: (option: OptionType) => string;
    placeholder?: string;
    required?: boolean;
    errorMessage?: string;
    className?: string;
    error?: boolean;
}

const SelectInput = <OptionType,>({
    label, value,
    onSelect, onChange,
    createNewOption,
    selectedOptionName,
    getOptionLabel,
    options, loading,
    placeholder = '', required = false, errorMessage = '', error = false, className = '',
}: SelectInputProps<OptionType>) => {
    const [isSelected, setIsSelected] = useState(false);
    const [selectedElement, setSelectedElement] = useState<string>(selectedOptionName);
    const [isActive, setIsActive] = useState(false);
    const blockRef = useRef<HTMLDivElement>(null);
    const [isError, setIsError] = useState<boolean>(error);

    const toggleVisibility = (state?: boolean) => {
        setIsActive(state !== undefined ? state : !isActive);
    };

    const createOption = (value: string) => {
        setIsError(false);
        if (value == "") return setIsError(true);
        setSelectedElement(value);
        const resultOption = createNewOption(value);
        onSelect(resultOption);
        setIsSelected(true);
    }

    const selectOption = (value: OptionType, name: string) => {
        setIsError(false);
        onSelect(value);
        setSelectedElement(name);
        setIsSelected(true);
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (blockRef.current && !blockRef.current.contains(event.target as Node)) {
            setIsActive(false);
        }
    };

    const removeSelectedOption = () => {
        setIsSelected(false);
        setSelectedElement("");
        onSelect(null);
    }

    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={`custom-select-input ${className}`} ref={blockRef}>
            <label className="input-label">
                <div>
                    {label}
                    {required && <span className="required-star">*</span>}
                </div>
                {isError && <span className="error-message">{errorMessage}</span>}
            </label>
            <div className={`select-input-wrapper ${isError ? "error" : ""}`}>
                {
                    isSelected ?
                        <div className='selected-filed'>
                            <span>{selectedElement}</span>
                            <CrossSVG onClick={() => removeSelectedOption()} />
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
                <button className='select-input-create' onClick={() => createOption(value)}>
                    Create new option +
                </button>
                <div className='select-input-list'>
                    {options.map((option: OptionType, key: number) => (
                        <div
                            key={key}
                            className='list-option'
                            onClick={() => selectOption(option, getOptionLabel(option))}
                        >
                            {getOptionLabel(option)}
                        </div>
                    ))}
                    {options.length === 0 ? <span>No results were found.</span> : null}
                </div>
            </div>
        </div>
    );
};

export default SelectInput;