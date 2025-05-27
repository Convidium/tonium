import { PrismaClient } from '@prisma/client';
import { BaseRepository } from './BaseRepository';
import { NewOrExistingEntityInput } from '@/app/api/types/definitions';

type TransactionClient = Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">;

export class ArtistRepository extends BaseRepository<'artists'> {
    constructor(client?: PrismaClient | TransactionClient) {
        super('artists', client);
    }

    async findOrCreateArtistId(input: NewOrExistingEntityInput): Promise<number> {
        if (input.isNew) {
            if (!input.name || input.name.trim() === '') {
                throw new Error('Artist name is required to create a new artist.');
            }
            const artistName = input.name.trim();
            const existingArtist = await (this.prisma.artists as PrismaClient['artists']).findFirst({
                where: { artist_name: artistName },
            });

            if (existingArtist) {
                return existingArtist.id;
            } else {
                const newArtist = await (this.prisma.artists as PrismaClient['artists']).create({
                    data: { 
                        artist_name: artistName
                    },
                });
                return newArtist.id;
            }
        } else {
            if (typeof input.id !== 'number' || input.id <= 0) {
                throw new Error('Valid ID is required for an existing artist.');
            }
            const existingArtist = await (this.prisma.artists as PrismaClient['artists']).findUnique({
                where: { id: input.id },
            });
            if (!existingArtist) {
                throw new Error(`Artist with ID ${input.id} not found.`);
            }
            return existingArtist.id;
        }
    }
}