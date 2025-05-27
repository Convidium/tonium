import { PrismaClient } from '@prisma/client';
import { BaseRepository } from './BaseRepository';
import { NewOrExistingEntityInput } from '@/app/api/types/definitions';

type TransactionClient = Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">;

export class TagRepository extends BaseRepository<'tags'> {
    constructor(client?: PrismaClient | TransactionClient) {
        super('tags', client);
    }

    async findOrCreateTagId(input: NewOrExistingEntityInput): Promise<number> {
        if (input.isNew) {
            if (!input.name || input.name.trim() === '') {
                throw new Error('Tag name is required to create a new tag.');
            }
            const tagName = input.name.trim();
            const existingTag = await (this.prisma.tags as PrismaClient['tags']).findUnique({
                where: { name: tagName },
            });

            if (existingTag) {
                return existingTag.id;
            } else {
                const newTag = await (this.prisma.tags as PrismaClient['tags']).create({
                    data: { name: tagName },
                });
                return newTag.id;
            }
        } else {
            if (typeof input.id !== 'number' || input.id <= 0) {
                throw new Error('Valid ID is required for an existing tag.');
            }
            const existingTag = await (this.prisma.tags as PrismaClient['tags']).findUnique({
                where: { id: input.id },
            });
            if (!existingTag) {
                throw new Error(`Tag with ID ${input.id} not found.`);
            }
            return existingTag.id;
        }
    }
}