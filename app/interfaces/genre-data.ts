interface GenreData {
    genre_id: number;
    genre_name: string;
    record_genres: any;
    song_genres: any;
}

export type GenreCreateInput = Omit<GenreData, 'genre_id' | 'record_genres' | 'song_genres'>;

export default GenreData;