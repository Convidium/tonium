import { PrismaClient } from '@prisma/client';
import prisma from '@/app/api/utils/prisma';

type TransactionClient = Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">;

export class BaseRepository<T extends string> {
    protected prisma: PrismaClient | TransactionClient;
    protected modelName: T;

    constructor(modelName: T, client?: PrismaClient | TransactionClient) { 
        this.modelName = modelName;
        this.prisma = client || prisma; 
    }
}