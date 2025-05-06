'use client';

import { formConfigs } from '@/app/configs/formConfigs/formConfigs';
import { FormProvider, FormStep } from '@/app/components/MultistepForms/FormContext';
import { MultistepForm } from '@/app/components/MultistepForms/MultistepForm';

interface FormBuilderProps {
    type: 'album' | 'single' | 'track' | 'compilation';
}

export const FormBuilder = ({ type }: FormBuilderProps) => {
    const config = formConfigs[type];
    console.log(formConfigs[type]);
    

    if (!config) {
        return <div>Invalid form type</div>
    }

    const handleSubmit = (formData: any) => {
        console.log('Final form data:', formData);
        // TODO: Handle form submission logic here
        // e.g., send to an API or save to a database
    };

    return (
        <FormProvider config={config}>
            <MultistepForm config={config} onSubmit={handleSubmit} />
        </FormProvider>
    )
}