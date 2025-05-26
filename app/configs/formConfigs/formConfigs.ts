import { FormStep } from '@/app/components/MultistepForms/FormContext';
import { albumConfig, buildAlbumEntity } from './album';
import { singleConfig } from './single';

type FormConfigsType = {
    album: {
        steps: FormStep[];
        buildEntity: any,
    };
    single: FormStep[];
    track?: FormStep[];
    compilation?: FormStep[];
};

export const formConfigs: FormConfigsType = {
    album: {
        steps: albumConfig,
        buildEntity: buildAlbumEntity,
    },
    single: singleConfig,
}