interface ArtistData {
    artist_id: number;
    artist_name: string;
    records: any;
    song_files: any;
}

export type ArtistCreateInput = Omit<ArtistData, 'artist_id' | 'records' | 'song_files'>;

export default ArtistData;