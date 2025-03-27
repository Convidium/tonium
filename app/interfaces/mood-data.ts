interface MoodData {
    mood_id: number;
    mood_name: string;
    record_moods: any;
    song_moods: any;
}

export type MoodCreateInput = Omit<MoodData, 'mood_id' | 'record_moods' | 'song_moods'>;

export default MoodData;