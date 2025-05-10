import React, { useEffect, useState } from 'react'
import TextInput from '../../UI/Input';
import SelectInput from '../../UI/SelectInput';
import DatePicker from '../../UI/DatePicker';
import "@/app/ui/styles/forms/albumForm/step1.scss";
import useDebouncedValue from '@/app/hooks/useDebouncedValue';
import { fetchData } from '@/app/services/fetchService';
import { memoize } from '@/app/utils/memoize';

type Artist = {
  artist_id?: number;
  artist_name: string;
  isNew?: boolean;
}

const memoizedFetchArtists = memoize(
  async (query: string) => {
    const response = await fetchData(`/api/artists?artist_name=${query}&fields=artist_id,artist_name`);
    return await response;
  },
  {
    maxSize: 50,
    ttl: 5 * 60 * 1000,
    policy: 'LRU'
  }
);

const Step1 = () => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Artist | null>(null);

  const [options, setOptions] = useState<Artist[]>([]);

  const [title, setTitle] = useState('');
  const [error, setError] = useState(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [artistQuery, setArtistQuery] = useState<string>("");
  const [artistError, setArtistError] = useState<boolean>(false);

  const debouncedQuery: string = useDebouncedValue(artistQuery, 300);

  useEffect(() => {
    memoizedFetchArtists("")
      .then(data => setOptions(data?.data || []))
      .catch((err) => {
        console.error("Artist fetch failed", err);
        setOptions([]);
      })
  }, []);

  useEffect(() => {
    if (debouncedQuery.trim() === '') {
      setOptions([]);
      return;
    }

    setIsLoading(true);
    memoizedFetchArtists(debouncedQuery.trim())
      .then(data => setOptions(data?.data || []))
      .catch((err) => {
        console.error("Artist fetch failed", err);
        setOptions([]);
      })
      .finally(() => setIsLoading(false));
  }, [debouncedQuery]);

  return (
    <div className='step1-album'>
      <TextInput
        label="Album Title"
        value={title}
        onChange={(val) => {
          setTitle(val);
          if (val.trim() !== '') setError(false);
        }}
        placeholder="Enter the title of the album"
        required
        error={error}
        errorMessage="This field is required!"
        className='album-title-input'
      />
      <SelectInput<Artist>
        label="Artist"
        value={artistQuery}
        onSelect={(val) => {
          setSelectedOption(val);
        }}
        onChange={(val) => {
          setArtistQuery(val);
          if (val.trim() !== '') setArtistError(false);
        }}
        createNewOption={(label) => ({
          artist_id: -1,
          artist_name: label,
          isNew: true
        })}
        options={options}
        selectedOptionName={selectedOption?.artist_name ? selectedOption?.artist_name : ""}
        getOptionLabel={(artist) => artist.artist_name}
        placeholder="Select artist (use 'Enter' to create)"
        required
        loading={isLoading}
        error={artistError}
        errorMessage="This field is required!"
        className='album-title-input'
      />
      <DatePicker
        label="Album Title"
        value={title}
        onChange={(val) => {
          setTitle(val);
          if (val.trim() !== '') setError(false);
        }}
        placeholder="Enter the title of the album"
        required
        error={error}
        errorMessage="This field is required!"
        className='album-title-input'
      />
    </div>
  )
}

export default Step1;