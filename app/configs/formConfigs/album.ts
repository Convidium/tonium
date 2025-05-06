import Step1 from '@/app/components/MultistepForms/AlbumForm/Step1';
// import { StepCover } from '@/components/form/steps/StepCover';
// import { StepTracks } from '@/app/components/MultistepForms/AlbumForm/';

import { FormStep } from '@/app/components/MultistepForms/FormContext';

export const albumConfig: FormStep[] = [
  { id: 'basic', title: "Add basic album info", component: Step1 },
//   { id: 'cover', component: StepCover },
//   { id: 'tracks', component: StepTracks },
]