export interface InputArtist {
    id?: number;
    artist_name?: string;
    isNew?: boolean;
    artist_logo_path?: string | null;
    active_from?: string | null;
    active_to?: string | null;
}

export interface InputLabel {
    isNew: boolean;
    label_name?: string;
    id?: number;
}

export interface InputProducer {
    isNew: boolean;
    producer_name?: string;
    id?: number;
}

export interface InputGenre {
    isNew: boolean;
    name?: string;
    id?: number;
}

export interface InputMood {
    isNew: boolean;
    name?: string;
    id?: number;
}

export interface InputTag {
    isNew: boolean;
    name?: string;
    id?: number;
}

export interface InputAlbumTrack {
  track: InputTrack;
  position: number;
}

export interface InputTrack {
  isNew?: boolean;
  track_id: number;
  track_name: string;
  track_path: string;
}

export interface InputWriter {
    isNew: boolean;
    writer_name?: string;
    writer_id?: number;
}

export interface InputRating {
    general_rating?: number;
    technical_proficency?: number;
    concept?: number;
    historical_impact?: number;
    song_enjoyability?: number;
    concistency?: number;
    personal_impact?: number;
    music_quality?: number;
    lyrics?: number;
}

export interface InputAlbumData {
    id?: number;                                // id is not used when adding an album, so it's optional here
    name: string;
    artist: InputArtist;
    release_date: string;
    info?: string | null;
    label_id?: number | null;
    producer_id?: number | null;
    front_cover_path?: string | null;
    back_cover_path?: string | null;
    tracks?: InputAlbumTrack[];
    genres?: InputGenre[];
    moods?: InputMood[];
    tags?: InputTag[];
    writers?: InputWriter[];
}