import { PrismaClient } from '@prisma/client';
import { BaseRepository } from './BaseRepository';
import { NewOrExistingEntityInput } from '@/app/api/types/definitions';

type TransactionClient = Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">;

export class WriterRepository extends BaseRepository<'writers'> {
    constructor(client?: PrismaClient | TransactionClient) {
        super('writers', client);
    }

    async findOrCreateWriterId(input: NewOrExistingEntityInput): Promise<number> {
        if (input.isNew) {
            if (!input.name || input.name.trim() === '') {
                throw new Error('Writer name is required to create a new writer.');
            }
            const writerName = input.name.trim();
            const existingWriter = await (this.prisma.writers as PrismaClient['writers']).findFirst({
                where: { writer_name: writerName },
            });

            if (existingWriter) {
                return existingWriter.writer_id;
            } else {
                const newWriter = await (this.prisma.writers as PrismaClient['writers']).create({
                    data: { writer_name: writerName },
                });
                return newWriter.writer_id;
            }
        } else {
            if (typeof input.id !== 'number' || input.id <= 0) {
                throw new Error('Valid ID is required for an existing writer.');
            }
            const existingWriter = await (this.prisma.writers as PrismaClient['writers']).findUnique({
                where: { writer_id: input.id },
            });
            if (!existingWriter) {
                throw new Error(`Writer with ID ${input.id} not found.`);
            }
            return existingWriter.writer_id;
        }
    }
}