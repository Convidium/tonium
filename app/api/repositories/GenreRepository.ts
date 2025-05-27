import { PrismaClient } from '@prisma/client';
import { BaseRepository } from './BaseRepository';
import { NewOrExistingEntityInput } from '@/app/api/types/definitions';

type TransactionClient = Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">;

export class GenreRepository extends BaseRepository<'genres'> {
    constructor(client?: PrismaClient | TransactionClient) {
        super('genres', client);
    }

    async findOrCreateGenreId(input: NewOrExistingEntityInput): Promise<number> {
        if (input.isNew) {
            if (!input.name || input.name.trim() === '') {
                throw new Error('Name is required to create a new genre.');
            }
            const genreName = input.name.trim();
            const existingGenre = await (this.prisma.genres as PrismaClient['genres']).findUnique({
                where: { name: genreName },
            });

            if (existingGenre) {
                return existingGenre.id;
            } else {
                const newGenre = await (this.prisma.genres as PrismaClient['genres']).create({
                    data: { name: genreName },
                });
                return newGenre.id;
            }
        }
        else {
            if (typeof input.id !== 'number' || input.id <= 0) {
                throw new Error('Valid ID is required for an existing genre.');
            }
            const existingGenre = await (this.prisma.genres as PrismaClient['genres']).findUnique({
                where: { id: input.id },
            });
            if (!existingGenre) {
                throw new Error(`Genre with ID ${input.id} not found.`);
            }
            return existingGenre.id;
        }
    }
}