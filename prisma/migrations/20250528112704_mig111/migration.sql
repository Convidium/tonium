-- CreateTable
CREATE TABLE "Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "storagePath" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Album_Artists" (
    "album_id" INTEGER NOT NULL,
    "artist_id" INTEGER NOT NULL,

    PRIMARY KEY ("album_id", "artist_id"),
    CONSTRAINT "Album_Artists_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "Albums" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Album_Artists_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "Artists" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Album_Artists" ("album_id", "artist_id") SELECT "album_id", "artist_id" FROM "Album_Artists";
DROP TABLE "Album_Artists";
ALTER TABLE "new_Album_Artists" RENAME TO "Album_Artists";
CREATE TABLE "new_Album_Genres" (
    "album_id" INTEGER NOT NULL,
    "genre_id" INTEGER NOT NULL,

    PRIMARY KEY ("album_id", "genre_id"),
    CONSTRAINT "Album_Genres_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "Albums" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Album_Genres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "Genres" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Album_Genres" ("album_id", "genre_id") SELECT "album_id", "genre_id" FROM "Album_Genres";
DROP TABLE "Album_Genres";
ALTER TABLE "new_Album_Genres" RENAME TO "Album_Genres";
CREATE TABLE "new_Album_Listen_History" (
    "listen_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "album_id" INTEGER NOT NULL,
    "listen_timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Album_Listen_History_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "Albums" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Album_Listen_History" ("album_id", "listen_id", "listen_timestamp") SELECT "album_id", "listen_id", "listen_timestamp" FROM "Album_Listen_History";
DROP TABLE "Album_Listen_History";
ALTER TABLE "new_Album_Listen_History" RENAME TO "Album_Listen_History";
CREATE TABLE "new_Album_Moods" (
    "album_id" INTEGER NOT NULL,
    "mood_id" INTEGER NOT NULL,

    PRIMARY KEY ("album_id", "mood_id"),
    CONSTRAINT "Album_Moods_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "Albums" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Album_Moods_mood_id_fkey" FOREIGN KEY ("mood_id") REFERENCES "Moods" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Album_Moods" ("album_id", "mood_id") SELECT "album_id", "mood_id" FROM "Album_Moods";
DROP TABLE "Album_Moods";
ALTER TABLE "new_Album_Moods" RENAME TO "Album_Moods";
CREATE TABLE "new_Album_Ratings" (
    "album_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "general_rating" INTEGER DEFAULT 0,
    "technical_proficency" INTEGER DEFAULT 0,
    "concept" INTEGER DEFAULT 0,
    "historical_impact" INTEGER DEFAULT 0,
    "song_enjoyability" INTEGER DEFAULT 0,
    "concistency" INTEGER DEFAULT 0,
    "personal_impact" INTEGER DEFAULT 0,
    "music_quality" INTEGER DEFAULT 0,
    "lyrics" INTEGER DEFAULT 0,
    CONSTRAINT "Album_Ratings_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "Albums" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Album_Ratings" ("album_id", "concept", "concistency", "general_rating", "historical_impact", "lyrics", "music_quality", "personal_impact", "song_enjoyability", "technical_proficency") SELECT "album_id", "concept", "concistency", "general_rating", "historical_impact", "lyrics", "music_quality", "personal_impact", "song_enjoyability", "technical_proficency" FROM "Album_Ratings";
DROP TABLE "Album_Ratings";
ALTER TABLE "new_Album_Ratings" RENAME TO "Album_Ratings";
CREATE TABLE "new_Album_Tags" (
    "album_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    PRIMARY KEY ("album_id", "tag_id"),
    CONSTRAINT "Album_Tags_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "Albums" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Album_Tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tags" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Album_Tags" ("album_id", "tag_id") SELECT "album_id", "tag_id" FROM "Album_Tags";
DROP TABLE "Album_Tags";
ALTER TABLE "new_Album_Tags" RENAME TO "Album_Tags";
CREATE TABLE "new_Album_Writers" (
    "album_id" INTEGER NOT NULL,
    "writer_id" INTEGER NOT NULL,

    PRIMARY KEY ("album_id", "writer_id"),
    CONSTRAINT "Album_Writers_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "Albums" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Album_Writers_writer_id_fkey" FOREIGN KEY ("writer_id") REFERENCES "Writers" ("writer_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Album_Writers" ("album_id", "writer_id") SELECT "album_id", "writer_id" FROM "Album_Writers";
DROP TABLE "Album_Writers";
ALTER TABLE "new_Album_Writers" RENAME TO "Album_Writers";
CREATE TABLE "new_Compilation_Genres" (
    "compilation_id" INTEGER NOT NULL,
    "genre_id" INTEGER NOT NULL,

    PRIMARY KEY ("compilation_id", "genre_id"),
    CONSTRAINT "Compilation_Genres_compilation_id_fkey" FOREIGN KEY ("compilation_id") REFERENCES "Compilations" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Compilation_Genres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "Genres" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Compilation_Genres" ("compilation_id", "genre_id") SELECT "compilation_id", "genre_id" FROM "Compilation_Genres";
DROP TABLE "Compilation_Genres";
ALTER TABLE "new_Compilation_Genres" RENAME TO "Compilation_Genres";
CREATE TABLE "new_Compilation_Listen_History" (
    "listen_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "compilation_id" INTEGER NOT NULL,
    "listen_timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Compilation_Listen_History_compilation_id_fkey" FOREIGN KEY ("compilation_id") REFERENCES "Compilations" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Compilation_Listen_History" ("compilation_id", "listen_id", "listen_timestamp") SELECT "compilation_id", "listen_id", "listen_timestamp" FROM "Compilation_Listen_History";
DROP TABLE "Compilation_Listen_History";
ALTER TABLE "new_Compilation_Listen_History" RENAME TO "Compilation_Listen_History";
CREATE TABLE "new_Compilation_Moods" (
    "compilation_id" INTEGER NOT NULL,
    "mood_id" INTEGER NOT NULL,

    PRIMARY KEY ("compilation_id", "mood_id"),
    CONSTRAINT "Compilation_Moods_compilation_id_fkey" FOREIGN KEY ("compilation_id") REFERENCES "Compilations" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Compilation_Moods_mood_id_fkey" FOREIGN KEY ("mood_id") REFERENCES "Moods" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Compilation_Moods" ("compilation_id", "mood_id") SELECT "compilation_id", "mood_id" FROM "Compilation_Moods";
DROP TABLE "Compilation_Moods";
ALTER TABLE "new_Compilation_Moods" RENAME TO "Compilation_Moods";
CREATE TABLE "new_Compilation_Tags" (
    "compilation_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    PRIMARY KEY ("compilation_id", "tag_id"),
    CONSTRAINT "Compilation_Tags_compilation_id_fkey" FOREIGN KEY ("compilation_id") REFERENCES "Compilations" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Compilation_Tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tags" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Compilation_Tags" ("compilation_id", "tag_id") SELECT "compilation_id", "tag_id" FROM "Compilation_Tags";
DROP TABLE "Compilation_Tags";
ALTER TABLE "new_Compilation_Tags" RENAME TO "Compilation_Tags";
CREATE TABLE "new_Single_Genres" (
    "single_id" INTEGER NOT NULL,
    "genre_id" INTEGER NOT NULL,

    PRIMARY KEY ("single_id", "genre_id"),
    CONSTRAINT "Single_Genres_single_id_fkey" FOREIGN KEY ("single_id") REFERENCES "Single" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Single_Genres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "Genres" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Single_Genres" ("genre_id", "single_id") SELECT "genre_id", "single_id" FROM "Single_Genres";
DROP TABLE "Single_Genres";
ALTER TABLE "new_Single_Genres" RENAME TO "Single_Genres";
CREATE TABLE "new_Single_Listen_History" (
    "listen_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "single_id" INTEGER NOT NULL,
    "listen_timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Single_Listen_History_single_id_fkey" FOREIGN KEY ("single_id") REFERENCES "Single" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Single_Listen_History" ("listen_id", "listen_timestamp", "single_id") SELECT "listen_id", "listen_timestamp", "single_id" FROM "Single_Listen_History";
DROP TABLE "Single_Listen_History";
ALTER TABLE "new_Single_Listen_History" RENAME TO "Single_Listen_History";
CREATE TABLE "new_Single_Moods" (
    "single_id" INTEGER NOT NULL,
    "mood_id" INTEGER NOT NULL,

    PRIMARY KEY ("single_id", "mood_id"),
    CONSTRAINT "Single_Moods_single_id_fkey" FOREIGN KEY ("single_id") REFERENCES "Single" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Single_Moods_mood_id_fkey" FOREIGN KEY ("mood_id") REFERENCES "Moods" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Single_Moods" ("mood_id", "single_id") SELECT "mood_id", "single_id" FROM "Single_Moods";
DROP TABLE "Single_Moods";
ALTER TABLE "new_Single_Moods" RENAME TO "Single_Moods";
CREATE TABLE "new_Single_Tags" (
    "single_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    PRIMARY KEY ("single_id", "tag_id"),
    CONSTRAINT "Single_Tags_single_id_fkey" FOREIGN KEY ("single_id") REFERENCES "Single" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Single_Tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tags" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Single_Tags" ("single_id", "tag_id") SELECT "single_id", "tag_id" FROM "Single_Tags";
DROP TABLE "Single_Tags";
ALTER TABLE "new_Single_Tags" RENAME TO "Single_Tags";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Settings_storagePath_key" ON "Settings"("storagePath");
