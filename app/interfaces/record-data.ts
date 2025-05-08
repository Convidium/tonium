interface RecordData {
    record_id: number;
    record_type: string;
    record_name: string;
    record_artist?: number | null;
    record_date?: Date | null;
    record_info?: string | null;
    record_label?: string | null;
    record_producer?: string | null;
    record_cover_path?: string | null;
    record_backcover_path?: string | null;
    record_back_cover_path?: string | null;
    artists?: any | null;
    record_genres: any;
    record_moods: any;
    song_files: any;
    recent_listened_records: any;
}

export type RecordCreateInput = Omit<RecordData, 'record_id' | 'artists' | 'record_genres' | 'record_moods' | 'song_files' | 'recent_listened_records'> & {
    record_artist?: number | null;
    record_date?: Date | null;
    // record_genres?: { connect: { record_id_genre_id: { record_id: number; genre_id: number } }};
    // record_moods?: { connect: { record_id_mood_id: { record_id: number; mood_id: number } }};
};

export default RecordData;