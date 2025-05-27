import { PrismaClient, Tracks } from '@prisma/client';
import { BaseRepository } from './BaseRepository';
import { NewOrExistingTrackInput } from '@/app/api/types/definitions';

type TransactionClient = Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">;

export class TrackRepository extends BaseRepository<'tracks'> {
    constructor(client?: PrismaClient | TransactionClient) {
        super('tracks', client);
    }

    /**
     * Знаходить існуючий трек за ID, або створює новий за назвою та шляхом.
     * @param input - Об'єкт NewOrExistingTrackInput.
     * @returns ID знайденого або створеного треку.
     * @throws Error, якщо вхідні дані невалідні або трек не знайдено/створено.
     */
    async findOrCreateTrackId(input: {
        isNew: boolean;
        track_id?: number;
        track_name?: string;
        track_path?: string;
    }): Promise<number> {
        if (input.isNew) {
            if (!input.track_name || input.track_name.trim() === '' || !input.track_path || input.track_path.trim() === '') {
                throw new Error('Track name and path are required to create a new track.');
            }
            const trackName = input.track_name.trim();
            const trackPath = input.track_path.trim();

            const existingTrack = await (this.prisma.tracks as PrismaClient['tracks']).findFirst({
                where: {
                    track_name: trackName,
                    track_path: trackPath,
                },
            });

            if (existingTrack) {
                return existingTrack.id;
            } else {
                const newTrack = await (this.prisma.tracks as PrismaClient['tracks']).create({
                    data: { track_name: trackName, track_path: trackPath },
                });
                return newTrack.id;
            }
        } else {
            if (typeof input.track_id !== 'number' || input.track_id <= 0) {
                throw new Error('Valid ID is required for an existing track.');
            }
            const existingTrack = await (this.prisma.tracks as PrismaClient['tracks']).findUnique({
                where: { id: input.track_id },
            });
            if (!existingTrack) {
                throw new Error(`Track with ID ${input.track_id} not found.`);
            }
            return existingTrack.id;
        }
    }

    /**
     * Отримує трек за ID.
     * @param id - ID треку.
     * @returns Об'єкт треку або null, якщо не знайдено.
     */

    async getTrackById(id: number): Promise<Tracks | null> {
        return (this.prisma.tracks as PrismaClient['tracks']).findUnique({
            where: { id },
        });
    }
}