import Step1 from '@/app/components/MultistepForms/AlbumForm/Step1';
import Step2 from '@/app/components/MultistepForms/AlbumForm/Step2';
import Step3 from '@/app/components/MultistepForms/AlbumForm/Step3';

import * as Yup from 'yup';
import { MIN_YEAR, MAX_YEAR } from '@/app/configs/constants';
import isTitleUnique from '@/app/utils/validators/isTitleUnique';

import { FormStep } from '@/app/components/MultistepForms/FormContext';
import { AlbumBuilder } from '@/app/builders/AlbumBilder';

import { Artist } from '@/app/types/selectableArtists';

const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[012])-(19|20)\d\d$/;

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
      date: Yup.string()
        .required('Date is required')
        .matches(dateRegex, 'Date must be in DD-MM-YYYY format')
        .test('is-valid-date', 'Date is not valid', value => {
          if (!value) return false;
          const [day, month, year] = value.split('-').map(Number);
          const dateObj = new Date(year, month - 1, day);
          return (
            dateObj.getFullYear() === year &&
            dateObj.getMonth() === month - 1 &&
            dateObj.getDate() === day
          );
        })
        .test("is-date-in-range", `Date must be from ${MIN_YEAR} to ${MAX_YEAR}`, value => {
          if (!value) return false;
          const year = Number(value.split('-')[2]);
          return year >= MIN_YEAR && year <= MAX_YEAR;
        }),
    }),
  },
  {
    id: 'additional',
    title: "Add additional album info",
    component: Step2,

  },
  {
    id: 'cover',
    title: "Upload album cover",
    component: Step3
  },
]


export const buildAlbumEntity = (formData: any) =>
  new AlbumBuilder()
    .setTitle(formData.title)
    .setArtist(formData.artist)
    .setDate(formData.date)
    .setProducer(formData.producer)
    .setLabel(formData.label)
    .setWriters(formData.writers)
    .setGenres(formData.genres)
    .setMoods(formData.moods)
    .setFrontCoverPath(formData.frontCoverPath)
    .setBackCoverPath(formData.backCoverPath)
    .setTags(formData.tags)
    .setDescription(formData.description)
    .setOverallRating(formData.overallRating)
    .setDetailedRating(formData.detailedRating)
    .setSongIds(formData.songIds)
    .build();