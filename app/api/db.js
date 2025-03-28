import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function findOne(table, filters = {}) {
    try {
        const where = { ...filters };
        const result = await prisma[table].findUnique({ where });
        return { data: result, status: 200 };
    } catch (error) {
        console.error('Prisma query error (findOne):', error);
        return { error: 'Prisma query failed', status: 500 };
    } finally {
        await prisma.$disconnect();
    }
}

export async function findMany(table, where = {}) {
    try {
        const result = await prisma[table].findMany({ where });
        return { data: result, status: 200 };
    } catch (error) {
        console.error('Prisma query error (findMany):', error);
        return { error: 'Prisma query failed', status: 500 };
    } finally {
        await prisma.$disconnect();
    }
}

export async function createOne(table, data) {
    if (!prisma[table]) {
        throw new Error(`Table "${table}" does not exist in Prisma schema.`);
    }
    return await prisma[table].create({ data });
}

export async function updateRecord(table, where, data) {
    if (!prisma[table]) {
        throw new Error(`Table "${table}" does not exist in Prisma schema.`);
    }
    return await prisma[table].update({ where, data });
}

export async function deleteRecord(table, where) {
    if (!prisma[table]) {
        throw new Error(`Table "${table}" does not exist in Prisma schema.`);
    }
    return await prisma[table].delete({ where });
}

export async function searchFTS(searchQuery, tables = ["song_files", "records", "artists", "recent_listened_records"]) {
    try {
        const results = {};

        if (tables.includes("song_files")) {
            results.song_files = await prisma.$queryRawUnsafe(
                `SELECT
                    sf.song_id,
                    sf.album_id,
                    sf.song_name,
                    ar.artist_name,
                    rec.record_name AS album_name,
                    sf.song_info,
                    sf.song_audio_path,
                    sf.track_number,
                    rec.record_cover_path,
                    rec.record_backcover_path
                FROM song_files_fts sf
                JOIN records rec ON sf.album_id = rec.record_id
                JOIN artists ar ON sf.song_artist = ar.artist_id
                WHERE song_files_fts MATCH ?`,
                `"${searchQuery}"` // Обертаємо пошуковий запит у подвійні лапки
            );
        }
        
        if (tables.includes("records")) {
            results.records = await prisma.$queryRawUnsafe(
                `SELECT * FROM records_fts WHERE record_name MATCH ? OR record_info MATCH ?`,
                `"${searchQuery}"`, // Обертаємо пошуковий запит у подвійні лапки
                `"${searchQuery}"`  // Обертаємо пошуковий запит у подвійні лапки
            );
        }
        
        if (tables.includes("artists")) {
            results.artists = await prisma.$queryRawUnsafe(
                `SELECT
                    afts.artist_id,
                    afts.artist_name,
                    a.artist_bio,
                    a.artist_logo_path,
                    a.artist_bg_path
                FROM artists_fts afts
                JOIN artists a ON afts.artist_id = a.artist_id
                WHERE afts.artist_name MATCH ?`,
                `"${searchQuery}"` // Обертаємо пошуковий запит у подвійні лапки
            );
        }
        
        if (tables.includes("recent_listened_records")) {
            results.recent_listened_records = await prisma.$queryRawUnsafe(
                `SELECT * FROM recent_listened_records_fts WHERE record_id MATCH ?`,
                `"${searchQuery}"` // Обертаємо пошуковий запит у подвійні лапки
            );
        }

        return { data: results, status: 200 };
    } catch (error) {
        console.error("Prisma query error (searchFTS):", error);
        return { error: "Prisma search query failed", status: 500 };
    }
}