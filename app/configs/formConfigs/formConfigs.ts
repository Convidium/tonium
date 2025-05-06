import { FormStep } from '@/app/components/MultistepForms/FormContext';
import { albumConfig } from './album';
import { singleConfig } from './single';

type FormConfigsType = {
    album: FormStep[];
    single: FormStep[];
    track?: FormStep[];
    compilation?: FormStep[];
};

export const formConfigs: FormConfigsType = {
    album: albumConfig,
    single: singleConfig,
}