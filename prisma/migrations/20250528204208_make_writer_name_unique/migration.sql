/*
  Warnings:

  - You are about to drop the `Album_Artists` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[writer_name]` on the table `Writers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `artist_id` to the `Albums` table without a default value. This is not possible if the table is not empty.
  - Added the required column `artist_id` to the `Single` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Album_Artists";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Albums" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "artist_id" INTEGER NOT NULL,
    "release_date" TEXT NOT NULL,
    "info" TEXT,
    "label_id" INTEGER,
    "producer_id" INTEGER,
    "front_cover_path" TEXT,
    "back_cover_path" TEXT,
    CONSTRAINT "Albums_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "Artists" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Albums" ("back_cover_path", "front_cover_path", "id", "info", "label_id", "name", "producer_id", "release_date") SELECT "back_cover_path", "front_cover_path", "id", "info", "label_id", "name", "producer_id", "release_date" FROM "Albums";
DROP TABLE "Albums";
ALTER TABLE "new_Albums" RENAME TO "Albums";
CREATE TABLE "new_Single" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "artist_id" INTEGER NOT NULL,
    "release_date" TEXT,
    "info" TEXT,
    "label_id" INTEGER,
    "producer_id" INTEGER,
    "front_cover_path" TEXT,
    "back_cover_path" TEXT,
    "a_side_track_id" INTEGER,
    "b_side_track_id" INTEGER,
    CONSTRAINT "Single_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "Artists" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Single_a_side_track_id_fkey" FOREIGN KEY ("a_side_track_id") REFERENCES "Tracks" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Single_b_side_track_id_fkey" FOREIGN KEY ("b_side_track_id") REFERENCES "Tracks" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Single" ("a_side_track_id", "b_side_track_id", "back_cover_path", "front_cover_path", "id", "info", "label_id", "name", "producer_id", "release_date") SELECT "a_side_track_id", "b_side_track_id", "back_cover_path", "front_cover_path", "id", "info", "label_id", "name", "producer_id", "release_date" FROM "Single";
DROP TABLE "Single";
ALTER TABLE "new_Single" RENAME TO "Single";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Writers_writer_name_key" ON "Writers"("writer_name");
