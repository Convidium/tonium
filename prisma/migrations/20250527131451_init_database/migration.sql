-- CreateTable
CREATE TABLE "Albums" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "release_date" TEXT,
    "info" TEXT,
    "label_id" INTEGER,
    "producer_id" INTEGER,
    "front_cover_path" TEXT,
    "back_cover_path" TEXT
);

-- CreateTable
CREATE TABLE "Single" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "release_date" TEXT,
    "info" TEXT,
    "label_id" INTEGER,
    "producer_id" INTEGER,
    "front_cover_path" TEXT,
    "back_cover_path" TEXT,
    "a_side_track_id" INTEGER,
    "b_side_track_id" INTEGER,
    CONSTRAINT "Single_a_side_track_id_fkey" FOREIGN KEY ("a_side_track_id") REFERENCES "Tracks" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Single_b_side_track_id_fkey" FOREIGN KEY ("b_side_track_id") REFERENCES "Tracks" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Compilations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "info" TEXT,
    "cover_path" TEXT
);

-- CreateTable
CREATE TABLE "Tracks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "track_name" TEXT NOT NULL,
    "track_path" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Artists" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "artist_logo_path" TEXT,
    "artist_name" TEXT NOT NULL,
    "active_from" TEXT,
    "active_to" TEXT
);

-- CreateTable
CREATE TABLE "Writers" (
    "writer_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "writer_name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Album_Writers" (
    "album_id" INTEGER NOT NULL,
    "writer_id" INTEGER NOT NULL,

    PRIMARY KEY ("album_id", "writer_id"),
    CONSTRAINT "Album_Writers_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "Albums" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Album_Writers_writer_id_fkey" FOREIGN KEY ("writer_id") REFERENCES "Writers" ("writer_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Genres" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Album_Genres" (
    "album_id" INTEGER NOT NULL,
    "genre_id" INTEGER NOT NULL,

    PRIMARY KEY ("album_id", "genre_id"),
    CONSTRAINT "Album_Genres_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "Albums" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Album_Genres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "Genres" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Single_Genres" (
    "single_id" INTEGER NOT NULL,
    "genre_id" INTEGER NOT NULL,

    PRIMARY KEY ("single_id", "genre_id"),
    CONSTRAINT "Single_Genres_single_id_fkey" FOREIGN KEY ("single_id") REFERENCES "Single" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Single_Genres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "Genres" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Compilation_Genres" (
    "compilation_id" INTEGER NOT NULL,
    "genre_id" INTEGER NOT NULL,

    PRIMARY KEY ("compilation_id", "genre_id"),
    CONSTRAINT "Compilation_Genres_compilation_id_fkey" FOREIGN KEY ("compilation_id") REFERENCES "Compilations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Compilation_Genres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "Genres" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Moods" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Album_Moods" (
    "album_id" INTEGER NOT NULL,
    "mood_id" INTEGER NOT NULL,

    PRIMARY KEY ("album_id", "mood_id"),
    CONSTRAINT "Album_Moods_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "Albums" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Album_Moods_mood_id_fkey" FOREIGN KEY ("mood_id") REFERENCES "Moods" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Single_Moods" (
    "single_id" INTEGER NOT NULL,
    "mood_id" INTEGER NOT NULL,

    PRIMARY KEY ("single_id", "mood_id"),
    CONSTRAINT "Single_Moods_single_id_fkey" FOREIGN KEY ("single_id") REFERENCES "Single" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Single_Moods_mood_id_fkey" FOREIGN KEY ("mood_id") REFERENCES "Moods" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Compilation_Moods" (
    "compilation_id" INTEGER NOT NULL,
    "mood_id" INTEGER NOT NULL,

    PRIMARY KEY ("compilation_id", "mood_id"),
    CONSTRAINT "Compilation_Moods_compilation_id_fkey" FOREIGN KEY ("compilation_id") REFERENCES "Compilations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Compilation_Moods_mood_id_fkey" FOREIGN KEY ("mood_id") REFERENCES "Moods" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Album_Tags" (
    "album_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    PRIMARY KEY ("album_id", "tag_id"),
    CONSTRAINT "Album_Tags_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "Albums" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Album_Tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tags" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Single_Tags" (
    "single_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    PRIMARY KEY ("single_id", "tag_id"),
    CONSTRAINT "Single_Tags_single_id_fkey" FOREIGN KEY ("single_id") REFERENCES "Single" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Single_Tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tags" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Compilation_Tags" (
    "compilation_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    PRIMARY KEY ("compilation_id", "tag_id"),
    CONSTRAINT "Compilation_Tags_compilation_id_fkey" FOREIGN KEY ("compilation_id") REFERENCES "Compilations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Compilation_Tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tags" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Album_Ratings" (
    "album_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "general_rating" INTEGER,
    "technical_proficency" INTEGER,
    "concept" INTEGER,
    "historical_impact" INTEGER,
    "song_enjoyability" INTEGER,
    "concistency" INTEGER,
    "personal_impact" INTEGER,
    "music_quality" INTEGER,
    "lyrics" INTEGER,
    CONSTRAINT "Album_Ratings_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "Albums" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Album_Listen_History" (
    "listen_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "album_id" INTEGER NOT NULL,
    "listen_timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Album_Listen_History_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "Albums" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Single_Listen_History" (
    "listen_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "single_id" INTEGER NOT NULL,
    "listen_timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Single_Listen_History_single_id_fkey" FOREIGN KEY ("single_id") REFERENCES "Single" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Compilation_Listen_History" (
    "listen_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "compilation_id" INTEGER NOT NULL,
    "listen_timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Compilation_Listen_History_compilation_id_fkey" FOREIGN KEY ("compilation_id") REFERENCES "Compilations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Genres_name_key" ON "Genres"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Moods_name_key" ON "Moods"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_name_key" ON "Tags"("name");
