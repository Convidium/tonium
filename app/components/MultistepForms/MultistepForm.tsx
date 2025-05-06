import { FormStep, useFormContext } from "./FormContext";
import "@/app/ui/styles/forms/multistepForm.scss";

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
                <div className="form-header">
                    <div className="tooltip">In Alpha</div>
                    <div className="title">{config[currentStep].title}</div>
                    <div className="step">Step: <span>{currentStep+1}</span> of {config.length}</div>
                </div>
                <hr className="splitting-line"/>
                <div className="step-viewport">
                    <CurrentComponent />
                </div>
                <div className="flex justify-between">
                    {currentStep > 0 && (
                        <button onClick={handleBack}>Back</button>
                    )}
                    {currentStep < config.length - 1 ? (
                        <button onClick={handleNext}>Next</button>
                    ) : (
                        <button onClick={handleSubmit}>Submit</button>
                    )}
                </div>
            </div>
        </div>
    )
}
