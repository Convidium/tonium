import { InputGenre } from '@/app/api/types/InputDefinitions';
import prisma from '@/app/api/utils/prisma';
import { Prisma, PrismaClient } from '@prisma/client';

export class GenreService {
    constructor(private tx: Prisma.TransactionClient = prisma) {}

    public async processInputGenres(inputGenres: InputGenre[]): Promise<number[]> {
        return await this.prepareGenres(inputGenres);
    }
    
    public async bindGenresToAlbum(albumId: number, genreIds: number[]) {
        if (genreIds.length === 0) return;
        await this.tx.album_Genres.createMany({
            data: genreIds.map((id) => ({
                album_id: albumId,
                genre_id: id,
            }))
        });
    }

    private async prepareGenres(genres: InputGenre[]): Promise<number[]> {
        const ids: number[] = [];

        for (const g of genres) {
            if (g.isNew && g.name) {
                const created = await this.tx.genres.upsert({
                    where: { name: g.name },
                    update: {},
                    create: { name: g.name },
                });
                ids.push(created.id);
            } else if (g.id) {
                ids.push(g.id);
            }
        }

        return ids;
    }
}