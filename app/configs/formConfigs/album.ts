import Step1 from '@/app/components/MultistepForms/AlbumForm/Step1';
import Step2 from '@/app/components/MultistepForms/AlbumForm/Step2';
import Step3 from '@/app/components/MultistepForms/AlbumForm/Step3';

import * as Yup from 'yup';
import isTitleUnique from '@/app/utils/validators/isTitleUnique';

import { FormStep } from '@/app/components/MultistepForms/FormContext';

import { Artist } from '@/app/types/selectableArtists';

export const albumConfig: FormStep[] = [

  {
    id: 'basic',
    title: "Add basic album info",
    component: Step1,
    validationSchema: Yup.object({
      title: Yup.string()
        .required('Title is required')
        .test('unique', 'Title already exists', async function (value) {
          console.log(value);

          if (!value) return true;
          const isUnique = await isTitleUnique(value, "/api/records?record_name=");
          return !!isUnique;
        }),
      artist: Yup.object()
        .nullable()
        .test("artist-not-empty", "Artist is required", (value: unknown) => {
          const artist = value as Artist | null;
          if (!artist) return false;

          const hasValues =
            !!artist.artist_id ||
            !!artist.artist_name ||
            typeof artist.isNew === "boolean";
          return hasValues;
        })
        .shape({
          isNew: Yup.boolean().required('Internal error: isNew flag is missing'),

          artist_name: Yup.string().when('isNew', {
            is: true,
            then: (schema) =>
              schema
                .required('Artist name is required for a new artist.')
                .test('unique', 'Artist name already exists', async (value) => {
                  if (!value) return true;
                  const isUnique = await isTitleUnique(value, "/api/artists?artist_name=");
                  return !!isUnique;
                }),
            otherwise: (schema) => schema.notRequired().nullable(),
          }),

          artist_id: Yup.string().when('isNew', {
            is: false,
            then: (schema) => schema.required('Please select an existing artist.'),
            otherwise: (schema) => schema.notRequired().nullable(),
          }),
        }),
    }),
  },
  {
    id: 'additional',
    title: "Add additional album info",
    component: Step2
  },
  {
    id: 'cover',
    title: "Upload album cover",
    component: Step3
  },
]