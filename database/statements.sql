CREATE TABLE artists (
    artist_id INTEGER PRIMARY KEY AUTOINCREMENT,
    artist_name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE genres (
    genre_id INTEGER PRIMARY KEY AUTOINCREMENT,
    genre_name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE moods (
    mood_id INTEGER PRIMARY KEY AUTOINCREMENT,
    mood_name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE records (
    record_id INTEGER PRIMARY KEY AUTOINCREMENT,
    record_type VARCHAR(50) NOT NULL,
    record_name VARCHAR(255) NOT NULL,
    record_artist INTEGER,
    record_date DATE,
    record_info TEXT,
    record_label VARCHAR(255),
    record_producer VARCHAR(255),
    record_cover_path VARCHAR(255),
    record_backcover_path VARCHAR(255),
    record_back_cover_path VARCHAR(255),
    FOREIGN KEY (record_artist) REFERENCES artists(artist_id)
);

CREATE INDEX idx_record_artist ON records(record_artist);

CREATE TABLE record_genres (
    record_id INTEGER,
    genre_id INTEGER,
    PRIMARY KEY (record_id, genre_id),
    FOREIGN KEY (record_id) REFERENCES records(record_id),
    FOREIGN KEY (genre_id) REFERENCES genres(genre_id)
);

CREATE TABLE record_moods (
    record_id INTEGER,
    mood_id INTEGER,
    PRIMARY KEY (record_id, mood_id),
    FOREIGN KEY (record_id) REFERENCES records(record_id),
    FOREIGN KEY (mood_id) REFERENCES moods(mood_id)
);

CREATE TABLE song_files (
    song_id INTEGER PRIMARY KEY AUTOINCREMENT,
    album_id INTEGER,
    song_name VARCHAR(255) NOT NULL,
    song_artist INTEGER,
    song_info TEXT,
    song_audio_path VARCHAR(255),
    track_number INTEGER,
    FOREIGN KEY (album_id) REFERENCES records(record_id),
    FOREIGN KEY (song_artist) REFERENCES artists(artist_id)
);

CREATE INDEX idx_album_id ON song_files(album_id);
CREATE INDEX idx_song_artist ON song_files(song_artist);
CREATE INDEX idx_track_number ON song_files(album_id, track_number);

CREATE TABLE song_genres (
    song_id INTEGER,
    genre_id INTEGER,
    PRIMARY KEY (song_id, genre_id),
    FOREIGN KEY (song_id) REFERENCES song_files(song_id),
    FOREIGN KEY (genre_id) REFERENCES genres(genre_id)
);

CREATE TABLE song_moods (
    song_id INTEGER,
    mood_id INTEGER,
    PRIMARY KEY (song_id, mood_id),
    FOREIGN KEY (song_id) REFERENCES song_files(song_id),
    FOREIGN KEY (mood_id) REFERENCES moods(mood_id)
);

CREATE TABLE recent_listened_records (
    user_id INTEGER,
    record_id INTEGER,
    listened_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, record_id),
    FOREIGN KEY (record_id) REFERENCES records(record_id)
);