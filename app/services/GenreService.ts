import { InputGenre } from '@/app/types/InputDefinitions';
import prisma from '@/app/utils/prisma';
import { Prisma, PrismaClient } from '@prisma/client';
import { buildPrismaQuery, BuildPrismaQueryOptions } from '../utils/buildAlbumQuery';
import { ExistingGenre } from '../types/serviceLayerDefinitions';

export class GenreService {
    constructor(private tx: Prisma.TransactionClient = prisma) { }

    public async createGenre(inputGenre: InputGenre) {
        if (inputGenre.id !== -1) throw new Error("Genre with this id already exists!");
        if (!inputGenre.name) throw new Error("Genre must have a name!");

        const genre = await this.tx.genres.create({
            data: {
                name: inputGenre.name
            }
        });

        return genre;
    }

    public async updateGenre(genre: ExistingGenre) {
        if (genre.id !== -1) throw new Error("Genre with this id already exists!");
        if (!genre.name) throw new Error("Genre must have a name!");

        const updatedGenre = await this.tx.genres.update({
            where: { id: Number(genre.id) },
            data: {
                name: genre.name
            },
        });

        return updatedGenre;
    }

    public async getGenres(options: BuildPrismaQueryOptions) {
        const query = buildPrismaQuery(options);

        const genres = await prisma.genres.findMany({
            ...query,
            include: query.include ? query.include : undefined
        });

        return genres;
    }

    public async getGenreById(id: number | null) {
        if (id === null) {
            throw new Error('Artist Not Found');
        }

        const genre = await prisma.genres.findUnique({
            where: { id }
        });

        if (!genre) throw new Error('Artist Not Found');
        return genre;
    }

    public async deleteGenre(genreId: number | null) {
        if (genreId === null) {
            throw new Error('Artist Not Found');
        }

        return await prisma.$transaction(async (tx) => {
            const genre = await tx.genres.findUnique({
                where: { id: genreId },
            });

            if (!genre) {
                throw new Error(`No artist with id ${genreId} was found.`);
            }

            await tx.artists.delete({
                where: { id: genreId },
            });

            return { success: true, id: genreId, name: genre.name };
        });
    }

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