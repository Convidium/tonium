import { PrismaClient } from '@prisma/client';
import { BaseRepository } from './BaseRepository';
import { NewOrExistingEntityInput } from '@/app/api/types/definitions';

type TransactionClient = Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">;

export class MoodRepository extends BaseRepository<'moods'> {
    constructor(client?: PrismaClient | TransactionClient) {
        super('moods', client);
    }

    async findOrCreateMoodId(input: NewOrExistingEntityInput): Promise<number> {
        if (input.isNew) {
            if (!input.name || input.name.trim() === '') {
                throw new Error('Mood name is required to create a new mood.');
            }
            const moodName = input.name.trim();
            const existingMood = await (this.prisma.moods as PrismaClient['moods']).findUnique({
                where: { name: moodName },
            });

            if (existingMood) {
                return existingMood.id;
            } else {
                const newMood = await (this.prisma.moods as PrismaClient['moods']).create({
                    data: { name: moodName },
                });
                return newMood.id;
            }
        } else {
            if (typeof input.id !== 'number' || input.id <= 0) {
                throw new Error('Valid ID is required for an existing mood.');
            }
            const existingMood = await (this.prisma.moods as PrismaClient['moods']).findUnique({
                where: { id: input.id },
            });
            if (!existingMood) {
                throw new Error(`Mood with ID ${input.id} not found.`);
            }
            return existingMood.id;
        }
    }
}