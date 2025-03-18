interface ArtistData {
    artist_id: number;
    artist_name: string;
    records: any; // Масив об'єктів RecordData
    song_files: any; // Масив об'єктів SongFileData
}

export type ArtistCreateInput = Omit<ArtistData, 'artist_id' | 'records' | 'song_files'>;

export default ArtistData;