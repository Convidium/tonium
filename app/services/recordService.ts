import { RecordType, SongType, ArtistType } from "@/app/types/records";

export const fetchRecords = async (query: string): Promise<RecordType[]> => {
  try {
    const res = await fetch(`/api/search?q=${query}`);

    if (!res.ok) throw new Error("Failed to fetch search results");
    const data = await res.json();
    console.log(`/api/search?q=${query}`, data);

    return Array.isArray(data.data?.records) ? data.data.records.map(record => ({
      ...record,
      image: record.record_cover_path || undefined,
      title: record.record_name,
      artist: record.record_producer || 'Various Artists',
    })) : [];
  } catch (error) {
    console.error("Error fetching records:", error);
    return [];
  }
};

export const fetchSongs = async (query: string): Promise<SongType[]> => {
  try {
    const res = await fetch(`/api/search?q=${query}`);

    if (!res.ok) throw new Error("Failed to fetch search results");
    const data = await res.json();
    console.log(`/api/search?q=${query}`, data);

    return Array.isArray(data.data?.song_files) ? data.data.song_files.map(song => ({
      ...song,
      image: song.record_cover_path || undefined,
      title: song.song_name,
      artist: song.artist_name,
    })) : [];
  } catch (error) {
    console.error("Error fetching songs:", error);
    return [];
  }
};

export const fetchArtists = async (query: string): Promise<ArtistType[]> => {
  try {
    const res = await fetch(`/api/search?q=${query}`);

    if (!res.ok) throw new Error("Failed to fetch search results");
    const data = await res.json();
    console.log(`/api/search?q=${query}`, data);

    return Array.isArray(data.data?.artists) ? data.data.artists.map(artist => ({
      ...artist,
      image: artist.artist_logo_path || undefined,
      title: artist.artist_name,
    })) : [];
  } catch (error) {
    console.error("Error fetching artists:", error);
    return [];
  }
};

export const fetchRecentRecords = async (): Promise<RecordType[]> => {
  try {
    const res = await fetch(`/api/recent_records?limit=6`);
    if (!res.ok) throw new Error("Failed to fetch recent records");
    const data = await res.json();
    return Array.isArray(data.data?.records) ? data.data.records.map(record => ({
      ...record,
      image: record.record_cover_path || undefined,
      title: record.record_name,
      artist: record.record_producer || 'Various Artists',
    })) : [];
  } catch (error) {
    console.error("Error fetching recent records:", error);
    return [];
  }
};