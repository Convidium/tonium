/*
  Warnings:

  - A unique constraint covering the columns `[artist_name]` on the table `Artists` will be added. If there are existing duplicate values, this will fail.
  - Made the column `release_date` on table `Albums` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "Album_Artists" (
    "album_id" INTEGER NOT NULL,
    "artist_id" INTEGER NOT NULL,

    PRIMARY KEY ("album_id", "artist_id"),
    CONSTRAINT "Album_Artists_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "Albums" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Album_Artists_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "Artists" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Albums" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "release_date" TEXT NOT NULL,
    "info" TEXT,
    "label_id" INTEGER,
    "producer_id" INTEGER,
    "front_cover_path" TEXT,
    "back_cover_path" TEXT
);
INSERT INTO "new_Albums" ("back_cover_path", "front_cover_path", "id", "info", "label_id", "name", "producer_id", "release_date") SELECT "back_cover_path", "front_cover_path", "id", "info", "label_id", "name", "producer_id", "release_date" FROM "Albums";
DROP TABLE "Albums";
ALTER TABLE "new_Albums" RENAME TO "Albums";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Artists_artist_name_key" ON "Artists"("artist_name");
