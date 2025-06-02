-- CreateTable
CREATE TABLE "Album_Tracks" (
    "album_id" INTEGER NOT NULL,
    "track_id" INTEGER NOT NULL,
    "track_position" INTEGER NOT NULL,

    PRIMARY KEY ("album_id", "track_id"),
    CONSTRAINT "Album_Tracks_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "Albums" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Album_Tracks_track_id_fkey" FOREIGN KEY ("track_id") REFERENCES "Tracks" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Compilation_Tracks" (
    "compilation_id" INTEGER NOT NULL,
    "track_id" INTEGER NOT NULL,
    "track_position" INTEGER NOT NULL,

    PRIMARY KEY ("compilation_id", "track_id"),
    CONSTRAINT "Compilation_Tracks_compilation_id_fkey" FOREIGN KEY ("compilation_id") REFERENCES "Compilations" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Compilation_Tracks_track_id_fkey" FOREIGN KEY ("track_id") REFERENCES "Tracks" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Album_Tracks_album_id_track_position_key" ON "Album_Tracks"("album_id", "track_position");

-- CreateIndex
CREATE UNIQUE INDEX "Compilation_Tracks_compilation_id_track_position_key" ON "Compilation_Tracks"("compilation_id", "track_position");
