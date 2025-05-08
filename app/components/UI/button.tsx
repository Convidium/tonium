import React from 'react';
import "@/app/ui/styles/ui-components/Button.scss";

interface ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false, className = '', icon, iconPosition = "right" }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`custom-button ${className}`}
        >
            <div className='button-bg'>
                {icon && iconPosition === 'left' && icon}
                <span>{label}</span>
                {icon && iconPosition === 'right' && icon}
            </div>
        </button>
    );
};

export default Button;