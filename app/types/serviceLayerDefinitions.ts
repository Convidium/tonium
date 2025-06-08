export interface Artist {
    artist_name: string;
    artist_logo_path?: string | null;
    active_from?: string | null;
    active_to?: string | null;
}

export interface ExistingArtist {
    id: number,
    artist_name: string;
    artist_logo_path?: string | null;
    active_from?: string | null;
    active_to?: string | null;
}

export interface ExistingGenre {
    id: number;
    name: string;
}