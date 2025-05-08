export interface RecordType {
    record_id: string;
    record_name: string;
    record_info?: string | null;
    record_label?: string | null;
    record_producer?: string | null;
    record_cover_path?: string | null;
    record_backcover_path?: string | null;
    image?: string;
    title?: string;
    artist?: string;
  }
  
  export interface SongType {
    song_id: number;
    album_id: number;
    song_name: string;
    artist_name: string;
    album_name: string;
    song_info?: string | null;
    song_audio_path?: string;
    track_number: number;
    record_cover_path?: string | null;
    record_backcover_path?: string | null;
    duration?: string;
    image?: string;
    title?: string;
    artist?: string;
  }
  
  export interface ArtistType {
    artist_id: string;
    artist_name: string;
    artist_bio?: string | null;
    artist_logo_path?: string | null;
    artist_bg_path?: string | null;
    image?: string;
    title?: string;
  }
  
  export const mapRecordData = (data: any): RecordType => ({
    record_id: data.record_id,
    record_name: data.record_name,
    record_info: data.record_info,
    record_label: data.record_label,
    record_producer: data.record_producer,
    record_cover_path: data.record_cover_path,
    record_backcover_path: data.record_backcover_path,
    image: data.record_cover_path || undefined,
    title: data.record_name,
    artist: data.record_producer || 'Various Artists'
  });
  
  export const mapSongData = (data: any): SongType => ({
    song_id: data.song_id,
    album_id: data.album_id,
    song_name: data.song_name,
    artist_name: data.artist_name,
    album_name: data.album_name,
    song_info: data.song_info,
    song_audio_path: data.song_audio_path,
    track_number: data.track_number,
    record_cover_path: data.record_cover_path,
    record_backcover_path: data.record_backcover_path,
    image: data.record_cover_path || undefined,
    title: data.song_name,
    artist: data.artist_name,
  });
  
  export const mapArtistData = (data: any): ArtistType => ({
    artist_id: data.artist_id,
    artist_name: data.artist_name,
    artist_bio: data.artist_bio,
    artist_logo_path: data.artist_logo_path,
    artist_bg_path: data.artist_bg_path,
    image: data.artist_logo_path || undefined,
    title: data.artist_name,
  });