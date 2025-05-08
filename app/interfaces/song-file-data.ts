interface SongFileData {
    song_id: number;
    album_id?: number | null;
    song_name: string;
    song_artist?: number | null;
    song_info?: string | null;
    song_audio_path?: string | null;
    track_number?: number | null;
    records?: any | null;
    artists?: any | null;
    song_genres: any; 
    song_moods: any
}

export type SongFileCreateInput = Omit<SongFileData, 'song_id' | 'records' | 'artists' | 'song_genres' | 'song_moods'> & {
    album_id?: number | null;
    song_artist?: number | null;
    track_number?: number | null;
    // song_genres?: { connect: { song_id_genre_id: { song_id: number; genre_id: number } }};
    // song_moods?: { connect: { song_id_mood_id: { song_id: number; mood_id: number } }};
};

export default SongFileData;