export interface NewOrExistingEntityInput {
    isNew: boolean;
    id?: number;
    name?: string;
}

export interface NewOrExistingTrackInput {
    isNew: boolean;
    track_id?: number;
    track_name?: string;
    track_path?: string;
    track_position: number;
}

export interface CreateAlbumRequest {
    name: string;
    artist: number;
    release_date: string;
    info?: string | null;
    label_id?: number | null;
    producer_id?: number | null;
    front_cover_path?: string | null;
    back_cover_path?: string | null;
    
    genres?: NewOrExistingEntityInput[];
    moods?: NewOrExistingEntityInput[];
    tags?: NewOrExistingEntityInput[];
    writers?: NewOrExistingEntityInput[];
    artists?: NewOrExistingEntityInput[]; 

    tracks?: NewOrExistingTrackInput[];
    
    ratings?: {
        general_rating: number;
    };
}