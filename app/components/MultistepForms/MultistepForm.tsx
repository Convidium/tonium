import { FormStep, useFormContext } from "./FormContext";
import "@/app/ui/styles/forms/multistepForm.scss";
import Button from "../UI/Button";
import ArrowSharpSVG from "@/app/ui/icons/arrow-sharp.svg";
import CheckSVG from "@/app/ui/icons/check.svg";
import { useState } from "react";

type MultistepFormProps = {
    config: FormStep[];
    onSubmit: (data: any) => void;
};

export const MultistepForm = ({ config, onSubmit }: MultistepFormProps) => {
    const { currentStep, nextStep, prevStep, formData } = useFormContext();
    const [errors, setErrors] = useState<Record<string, string>>({});

    const currentStepConfig = config[currentStep];
    const CurrentComponent = currentStepConfig.component;

    const handleNext = async () => {
        if (currentStepConfig.validationSchema) {
            try {
                await currentStepConfig.validationSchema.validate(formData, { abortEarly: false });
                setErrors({});
                nextStep();
            } catch (err: any) {
                if (err.inner) {
                    const errorObj: Record<string, string> = {};
                    err.inner.forEach((e: any) => {
                        if (e.path) errorObj[e.path] = e.message;
                    });
                    setErrors(errorObj);
                    console.log(errorObj);
                } else {
                    setErrors({ general: err.message });
                }
            }
        } else {
            setErrors({});
            nextStep();
        }
    };

    const handleBack = () => {
        prevStep();
    };

    const handleSubmit = () => {
        onSubmit(formData);
    };

    return (
        <div className="form-wrapper">
            <div className="form-container">
                <div className="form-header-wrapper">
                    <div className="form-header">
                        <div className="tooltip"></div>
                        <div className="title">{config[currentStep].title}</div>
                        <div className="step">Step: <span>{currentStep + 1}</span> of {config.length}</div>
                    </div>
                    <hr className="splitting-line" />
                </div>
                <div className="step-viewport">
                    <CurrentComponent errors={errors}/>
                </div>
                <div className={(currentStep === 0 ? "nav-end " : "") + "step-navigation"}>
                    {currentStep > 0 && (
                        <Button label="Prev" onClick={handleBack} className="nav-button nav-prev" icon={<ArrowSharpSVG />} iconPosition={"left"} />
                    )}
                    {currentStep < config.length - 1 ? (
                        <Button label="Next" onClick={handleNext} className="nav-button nav-next" icon={<ArrowSharpSVG />} iconPosition={"right"} />
                    ) : (
                        <Button label="Submit" onClick={handleSubmit} className="nav-button nav-submit" icon={<CheckSVG />} />
                    )}
                </div>
            </div>
        </div>
    )
}
