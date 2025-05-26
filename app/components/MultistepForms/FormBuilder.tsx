'use client';
import { formConfigs } from '@/app/configs/formConfigs/formConfigs';
import { FormProvider, FormStep } from '@/app/components/MultistepForms/FormContext';
import { MultistepForm } from '@/app/components/MultistepForms/MultistepForm';

interface FormBuilderProps {
    type: 'album' | 'single' | 'track' | 'compilation';
}

export const FormBuilder = ({ type }: FormBuilderProps) => {
    const configObj = formConfigs[type];

    if (!configObj) {
        return <div>Invalid form type</div>
    }

    const normalizedConfig = Array.isArray(configObj)
        ? { steps: configObj, buildEntity: undefined }
        : configObj;

    const handleSubmit = (formData: any) => {
        const entity = normalizedConfig.buildEntity
            ? normalizedConfig.buildEntity(formData)
            : formData;
        // Submit entity to API
        console.log('Final entity:', entity);
    };

    return (
        <FormProvider config={normalizedConfig.steps}>
            <MultistepForm config={normalizedConfig.steps} onSubmit={handleSubmit} />
        </FormProvider>
    )
}