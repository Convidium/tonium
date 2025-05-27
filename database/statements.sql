CREATE TABLE Albums (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    release_date TEXT NOT NULL,
    info TEXT,
    label_id INTEGER,
    producer_id INTEGER,
    front_cover_path TEXT,
    back_cover_path TEXT
)

CREATE TABLE Single (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    release_date TEXT,
    info TEXT,
    label_id INTEGER,
    producer_id INTEGER,
    front_cover_path TEXT,
    back_cover_path TEXT,
    a_side_track_id INTEGER,
    b_side_track_id INTEGER,
    FOREIGN KEY (a_side_track_id) REFERENCES Tracks(id),
    FOREIGN KEY (b_side_track_id) REFERENCES Tracks(id)
);

CREATE TABLE Compilations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    info TEXT,
    cover_path TEXT
);

CREATE TABLE Tracks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    track_name TEXT NOT NULL,
    track_path TEXT NOT NULL
);

CREATE TABLE Artists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    artist_logo_path TEXT,
    artist_name TEXT NOT NULL,
    active_from TEXT,
    active_to TEXT
);



CREATE TABLE Writers (
    writer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    writer_name TEXT NOT NULL
);

CREATE TABLE Album_Writers (
    album_id INTEGER,
    writer_id INTEGER,
    PRIMARY KEY (album_id, writer_id),
    FOREIGN KEY (album_id) REFERENCES Albums(id),
    FOREIGN KEY (writer_id) REFERENCES Writers(writer_id)
);



CREATE TABLE Genres (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE Album_Genres (
    album_id INTEGER,
    genre_id INTEGER,
    PRIMARY KEY (album_id, genre_id),
    FOREIGN KEY (album_id) REFERENCES Albums(id),
    FOREIGN KEY (genre_id) REFERENCES Genres(id)
);
CREATE TABLE Single_Genres (
    single_id INTEGER,
    genre_id INTEGER,
    PRIMARY KEY (single_id, genre_id),
    FOREIGN KEY (single_id) REFERENCES Single(id),
    FOREIGN KEY (genre_id) REFERENCES Genres(id)
);
CREATE TABLE Compilation_Genres (
    compilation_id INTEGER,
    genre_id INTEGER,
    PRIMARY KEY (compilation_id, genre_id),
    FOREIGN KEY (compilation_id) REFERENCES Compilations(id),
    FOREIGN KEY (genre_id) REFERENCES Genres(id)
);



CREATE TABLE Moods (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE Album_Moods (
    album_id INTEGER,
    mood_id INTEGER,
    PRIMARY KEY (album_id, mood_id),
    FOREIGN KEY (album_id) REFERENCES Albums(id),
    FOREIGN KEY (mood_id) REFERENCES Moods(id)
);
CREATE TABLE Single_Moods (
    single_id INTEGER,
    mood_id INTEGER,
    PRIMARY KEY (single_id, mood_id),
    FOREIGN KEY (single_id) REFERENCES Single(id),
    FOREIGN KEY (mood_id) REFERENCES Moods(id)
);
CREATE TABLE Compilation_Moods (
    compilation_id INTEGER,
    mood_id INTEGER,
    PRIMARY KEY (compilation_id, mood_id),
    FOREIGN KEY (compilation_id) REFERENCES Compilations(id),
    FOREIGN KEY (mood_id) REFERENCES Moods(id)
);



CREATE TABLE Tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE Album_Tags (
    album_id INTEGER,
    tag_id INTEGER,
    PRIMARY KEY (album_id, tag_id),
    FOREIGN KEY (album_id) REFERENCES Albums(id),
    FOREIGN KEY (tag_id) REFERENCES Tags(id)
);
CREATE TABLE Single_Tags (
    single_id INTEGER,
    tag_id INTEGER,
    PRIMARY KEY (single_id, tag_id),
    FOREIGN KEY (single_id) REFERENCES Single(id),
    FOREIGN KEY (tag_id) REFERENCES Tags(id)
);
CREATE TABLE Compilation_Tags (
    compilation_id INTEGER,
    tag_id INTEGER,
    PRIMARY KEY (compilation_id, tag_id),
    FOREIGN KEY (compilation_id) REFERENCES Compilations(id),
    FOREIGN KEY (tag_id) REFERENCES Tags(id)
);

CREATE TABLE Album_Tracks (
    album_id INTEGER NOT NULL,
    track_id INTEGER NOT NULL,
    track_position INTEGER NOT NULL,
    PRIMARY KEY (album_id, track_id),
    UNIQUE (album_id, track_position),
    FOREIGN KEY (album_id) REFERENCES Albums(id) ON DELETE CASCADE,
    FOREIGN KEY (track_id) REFERENCES Tracks(id) ON DELETE CASCADE
);

CREATE TABLE Compilation_Tracks (
    compilation_id INTEGER NOT NULL,
    track_id INTEGER NOT NULL,
    track_position INTEGER NOT NULL,
    PRIMARY KEY (compilation_id, track_id),
    UNIQUE (compilation_id, track_position),
    FOREIGN KEY (compilation_id) REFERENCES Compilations(id) ON DELETE CASCADE,
    FOREIGN KEY (track_id) REFERENCES Tracks(id) ON DELETE CASCADE
);



CREATE TABLE Album_Ratings (
    album_id INTEGER PRIMARY KEY,
    general_rating INTEGER CHECK (general_rating BETWEEN 1 AND 10),
    technical_proficency INTEGER CHECK (technical_proficency BETWEEN 1 AND 100),
    concept INTEGER CHECK (concept BETWEEN 1 AND 100),
    historical_impact INTEGER CHECK (historical_impact BETWEEN 1 AND 100),
    song_enjoyability INTEGER CHECK (song_enjoyability BETWEEN 1 AND 100),
    concistency INTEGER CHECK (concistency BETWEEN 1 AND 100),
    personal_impact INTEGER CHECK (personal_impact BETWEEN 1 AND 100),
    music_quality INTEGER CHECK (music_quality BETWEEN 1 AND 100),
    lyrics INTEGER CHECK (lyrics BETWEEN 1 AND 100),
    FOREIGN KEY (album_id) REFERENCES Albums(id)
);



CREATE TABLE Album_Listen_History (
    listen_id INTEGER PRIMARY KEY AUTOINCREMENT,
    album_id INTEGER NOT NULL,
    listen_timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (album_id) REFERENCES Albums(id)
);

CREATE TABLE Single_Listen_History (
    listen_id INTEGER PRIMARY KEY AUTOINCREMENT,
    single_id INTEGER NOT NULL,
    listen_timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (single_id) REFERENCES Single(id)
);

CREATE TABLE Compilation_Listen_History (
    listen_id INTEGER PRIMARY KEY AUTOINCREMENT,
    compilation_id INTEGER NOT NULL,
    listen_timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (compilation_id) REFERENCES Compilations(id)
);