import { PrismaClient } from '@prisma/client';

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