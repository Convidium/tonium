import React, { useEffect, useState } from 'react'
import TextInput from '../../UI/Input';
import SelectInput from '../../UI/SelectInput';
import DatePicker from '../../UI/DatePicker';

import "@/app/ui/styles/forms/albumForm/albumForm.scss";
import useDebouncedValue from '@/app/hooks/useDebouncedValue';
import { fetchEntities } from '@/app/services/entityService';
import { memoize } from '@/app/utils/memoize';
import { Artist } from '@/app/types/selectableArtists';
import { StepComponentProps, useFormContext } from '../FormContext';
import MultipleSelectInput from '../../UI/MultipleSelectInput';

const fetchArtistsMemoized = memoize(fetchEntities<Artist>, {
  maxSize: 50,
  ttl: 5 * 60 * 1000, // 5 minutes
  serializeArgs: (args) => JSON.stringify(args),
});

const Step2: React.FC<StepComponentProps> = ({ errors }) => {
  const { formData, setFormData } = useFormContext();

  const [selectedTitle, setSelectedTitle] = useState<string>(formData.title || "");
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(formData.artist || null);

  const [artistOptions, setArtistOptions] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [artistQuery, setArtistQuery] = useState<string>("");

  const debouncedQuery: string = useDebouncedValue(artistQuery, 300);

  useEffect(() => {
    fetchEntities<Artist>({
      endpoint: '/api/artists',
      fields: ["artist_id", "artist_name"],
      defaults: {
        artist_id: -1,
        isNew: false,
      },
    })
      .then(setArtistOptions)
      .catch((err: any) => {
        console.error("Artist fetch failed", err);
        setArtistOptions([]);
      })
      .finally(() => setIsLoading(false));;
  }, []);

  useEffect(() => {
    if (debouncedQuery.trim() === '') {
      setArtistOptions([]);
      return;
    }
    setIsLoading(true);
    fetchArtistsMemoized({
      endpoint: '/api/artists',
      query: { artist_name: debouncedQuery },
      fields: ["artist_id", "artist_name"],
      defaults: {
        artist_id: -1,
        isNew: false,
      },
    })
      .then(setArtistOptions)
      .catch((err: any) => {
        console.error("Artist fetch failed", err);
        setArtistOptions([]);
      })
      .finally(() => setIsLoading(false));
  }, [debouncedQuery]);

  return (
    <div className='step2-album'>
      <TextInput
        label="Producer"
        value={selectedTitle}
        onChange={(val) => {
          setSelectedTitle(val);
          setFormData({ title: val })
        }}
        placeholder="Enter the title of the album"
        required
        errorMessage={errors.title}
        isError={!!errors.title}
        className='album-title-input'
      />
      <TextInput
        label="Label"
        value={selectedTitle}
        onChange={(val) => {
          setSelectedTitle(val);
          setFormData({ title: val })
        }}
        placeholder="Enter the title of the album"
        required
        errorMessage={errors.title}
        isError={!!errors.title}
        className='album-title-input'
      />
      <MultipleSelectInput<Artist>
        label="Writer"
        value={artistQuery}
        prevSelected={selectedArtist}
        onSelect={(val) => {
          setSelectedArtist(val);
          setFormData({ artist: val })
        }}
        onChange={(val) => {
          setArtistQuery(val);
        }}
        createNewOption={(label) => ({
          artist_id: -1,
          artist_name: label,
          isNew: true
        })}
        options={artistOptions}
        selectedOptionName={selectedArtist?.artist_name ? selectedArtist?.artist_name : ""}
        getOptionLabel={(artist) => artist.artist_name}
        placeholder="Select artist (use 'Enter' to create)"
        required
        loading={isLoading}
        errorMessage={errors.artist}
        isError={!!errors.artist}
        className='album-title-input'
      />
      <MultipleSelectInput<Artist>
        label="Artist"
        value={artistQuery}
        prevSelected={selectedArtist}
        onSelect={(val) => {
          setSelectedArtist(val);
          setFormData({ artist: val })
        }}
        onChange={(val) => {
          setArtistQuery(val);
        }}
        createNewOption={(label) => ({
          artist_id: -1,
          artist_name: label,
          isNew: true
        })}
        options={artistOptions}
        selectedOptionName={selectedArtist?.artist_name ? selectedArtist?.artist_name : ""}
        getOptionLabel={(artist) => artist.artist_name}
        placeholder="Select artist (use 'Enter' to create)"
        required
        loading={isLoading}
        errorMessage={errors.artist}
        isError={!!errors.artist}
        className='album-title-input'
      />
      <MultipleSelectInput<Artist>
        label="Artist"
        value={artistQuery}
        prevSelected={selectedArtist}
        onSelect={(val) => {
          setSelectedArtist(val);
          setFormData({ artist: val })
        }}
        onChange={(val) => {
          setArtistQuery(val);
        }}
        createNewOption={(label) => ({
          artist_id: -1,
          artist_name: label,
          isNew: true
        })}
        options={artistOptions}
        selectedOptionName={selectedArtist?.artist_name ? selectedArtist?.artist_name : ""}
        getOptionLabel={(artist) => artist.artist_name}
        placeholder="Select artist (use 'Enter' to create)"
        required
        loading={isLoading}
        errorMessage={errors.artist}
        isError={!!errors.artist}
        className='album-title-input'
      />
    </div>
  )
}

export default Step2;