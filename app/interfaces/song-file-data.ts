interface SongFileData {
    song_id: number;
    album_id?: number | null;
    song_name: string;
    song_artist?: number | null;
    song_info?: string | null;
    song_audio_path?: string | null;
    track_number?: number | null;
    records?: any | null; // Посилання на інтерфейс RecordData
    artists?: any | null; // Посилання на інтерфейс ArtistData
    song_genres: any; // Масив об'єктів SongGenre
    song_moods: any; // Масив об'єктів SongMood
}

export type SongFileCreateInput = Omit<SongFileData, 'song_id' | 'records' | 'artists' | 'song_genres' | 'song_moods'> & {
    album_id?: number | null;
    song_artist?: number | null;
    track_number?: number | null;
    // Можливо, вам знадобиться вказати ID існуючих жанрів та настроїв при створенні
    // song_genres?: { connect: { song_id_genre_id: { song_id: number; genre_id: number } }};
    // song_moods?: { connect: { song_id_mood_id: { song_id: number; mood_id: number } }};
};

export default SongFileData;