import { FormStep, useFormContext } from "./FormContext";
import "@/app/ui/styles/forms/multistepForm.scss";
import Button from "../UI/Button";
import ArrowSharpSVG from "@/app/ui/icons/arrow-sharp.svg";
import CheckSVG from "@/app/ui/icons/check.svg";

type MultistepFormProps = {
    config: FormStep[];
    onSubmit: (data: any) => void;
};

export const MultistepForm = ({ config, onSubmit }: MultistepFormProps) => {
    const { currentStep, nextStep, prevStep, formData, setFormData } = useFormContext();

    const CurrentComponent = config[currentStep].component;

    const handleNext = () => {
        // TODO: Add validation logic here
        // If validation passes, proceed to the next step
        nextStep();
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
                        <div className="tooltip">In Alpha</div>
                        <div className="title">{config[currentStep].title}</div>
                        <div className="step">Step: <span>{currentStep + 1}</span> of {config.length}</div>
                    </div>
                    <hr className="splitting-line" />
                </div>
                <div className="step-viewport">
                    <CurrentComponent />
                </div>
                <div className={(currentStep === 0 ? "nav-end " : "") + "step-navigation"}>
                    {currentStep > 0 && (
                        <Button label="Prev" onClick={handleBack} className="nav-button nav-prev" icon={<ArrowSharpSVG/>} iconPosition={"left"}/>
                    )}
                    {currentStep < config.length - 1 ? (
                        <Button label="Next" onClick={handleNext} className="nav-button nav-next" icon={<ArrowSharpSVG/>} iconPosition={"right"}/>
                    ) : (
                        <Button label="Submit" onClick={handleSubmit} className="nav-button nav-submit" icon={<CheckSVG/>}/>
                    )}
                </div>
            </div>
        </div>
    )
}
