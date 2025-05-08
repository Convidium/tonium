import Step1 from '@/app/components/MultistepForms/AlbumForm/Step1';
import Step2 from '@/app/components/MultistepForms/AlbumForm/Step2';
import Step3 from '@/app/components/MultistepForms/AlbumForm/Step3';

import { FormStep } from '@/app/components/MultistepForms/FormContext';

export const albumConfig: FormStep[] = [
  { id: 'basic', title: "Add basic album info", component: Step1 },
  { id: 'additional', title: "Add additional album info", component: Step2 },
  { id: 'cover', title: "Upload album cover", component: Step3 },
]