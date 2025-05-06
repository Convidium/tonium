import { useState, useEffect } from "react";
import { fetchRecords, fetchRecentRecords, fetchSongs, fetchArtists } from "@/app/services/recordService";
import { RecordType, SongType, ArtistType } from "@/app/domain/types/records";

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [records, setRecords] = useState<RecordType[]>([]);
  const [recentRecords, setRecentRecords] = useState<RecordType[]>([]);
  const [songs, setSongs] = useState<SongType[]>([]);
  const [artists, setArtists] = useState<ArtistType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    if (searchTerm.length > 1) {
      setLoading(true);
      Promise.all([
        fetchRecords(searchTerm).then(setRecords),
        fetchSongs(searchTerm).then(setSongs),
        fetchArtists(searchTerm).then(setArtists),
      ]).finally(() => setLoading(false));
    } else {
      setRecords([]);
      setSongs([]);
      setArtists([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (isFocused && recentRecords.length === 0) {
      fetchRecentRecords().then(setRecentRecords);
    }
  }, [isFocused]);

  return {
    searchTerm,
    setSearchTerm,
    records,
    recentRecords,
    loading,
    isFocused,
    setIsFocused,
    songs,
    artists,
  };
};