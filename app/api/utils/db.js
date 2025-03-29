import { PrismaClient, Prisma } from '@prisma/client';
import { songFilesQuery, recordsQuery, artistsQuery, recentListenedRecordsQuery } from '@/database/queries';

const prisma = new PrismaClient();

export async function findOne(table, filters = {}) {
    try {
        const result = await prisma[table].findFirst({
            where: { ...filters }
        });

        return { data: result, status: 200 };
    } catch (error) {
        console.error('Prisma query error (findOne):', error);
        return { error: 'Prisma query failed', status: 500 };
    } finally {
        await prisma.$disconnect();
    }
}

export async function findMany(table, where = {}, limit, page) {
    try {
        const skip = limit && page ? (page - 1) * limit : 0;
        const take = limit || undefined;

        const result = await prisma[table].findMany({
            where,
            skip,
            take,
        });

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

export async function searchFTS(searchQuery, tables = ["song_files", "records", "artists", "recent_listened_records"], limit = 10, page = 1) {
    try {
        const results = {};
        const offset = (page - 1) * limit;

        const queryConfig = {
            song_files: {
                query: songFilesQuery,
                params: [`"${searchQuery}"`, limit, offset],
            },
            records: {
                query: recordsQuery,
                params: [`"${searchQuery}"`, `"${searchQuery}"`, limit, offset],
            },
            artists: {
                query: artistsQuery,
                params: [`"${searchQuery}"`, limit, offset],
            },
            recent_listened_records: {
                query: recentListenedRecordsQuery,
                params: [`"${searchQuery}"`, limit, offset],
            },
        };

        for (const table of tables) {
            if (queryConfig[table]) {
                const { query, params } = queryConfig[table];
                results[table] = await prisma.$queryRawUnsafe(query, ...params);
            }
        }

        return { data: results, status: 200 };
    } catch (error) {
        console.error("Prisma query error (searchFTS):", error);
        return { error: "Prisma search query failed", status: 500 };
    }
}