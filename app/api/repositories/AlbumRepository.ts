import { Prisma, PrismaClient, PrismaPromise } from '@prisma/client';
import { BaseRepository } from './BaseRepository';
import { CreateAlbumRequest, NewOrExistingEntityInput, NewOrExistingTrackInput } from '@/app/api/types/definitions';

import { GenreRepository } from './GenreRepository';
import { WriterRepository } from './WriterRepository';
import { MoodRepository } from './MoodRepository';
import { TagRepository } from './TagRepository';
import { TrackRepository } from './TrackRepository';
import { ArtistRepository } from './ArtistRepository';

type TransactionClient = Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">;


export class AlbumRepository extends BaseRepository<'albums'> {
    constructor() {
        super('albums');
    }

    async getAllAlbumsWithDetails() {
        return this.prisma.albums.findMany({
            include: {
                albumGenres: { include: { genre: true } },
                albumMoods: { include: { mood: true } },
                albumTags: { include: { tag: true } },
                albumWriters: { include: { writer: true } },
                albumRatings: true,
                albumListenHistory: true,
            },
        });
    }

    async getAlbumByIdWithDetails(id: number) {
        return this.prisma.albums.findUnique({
            where: { id },
            include: {
                albumGenres: { include: { genre: true } },
                albumMoods: { include: { mood: true } },
                albumTags: { include: { tag: true } },
                albumWriters: { include: { writer: true } },
                albumRatings: true,
                albumListenHistory: true,
                albumTracks: {
                    include: {
                        track: true
                    },
                    orderBy: {
                        track_position: 'asc'
                    }
                },
            },
        });
    }

    async addGenreToAlbum(albumId: number, genreId: number) {
        return this.prisma.album_Genres.create({
            data: {
                album_id: albumId,
                genre_id: genreId,
            },
        });
    }

    async removeGenreFromAlbum(albumId: number, genreId: number) {
        return this.prisma.album_Genres.delete({
            where: {
                album_id_genre_id: {
                    album_id: albumId,
                    genre_id: genreId,
                },
            },
        });
    }

    async createAlbumWithTracks(albumData: Prisma.AlbumsCreateInput, tracksWithPosition: Array<{ track_id: number; track_position: number }>) {
        return this.prisma.albums.create({
            data: {
                ...albumData,
                albumTracks: {
                    create: tracksWithPosition.map(t => ({
                        track: { connect: { id: t.track_id } },
                        track_position: t.track_position
                    }))
                }
            }
        });
    }

    async addTrackToAlbum(albumId: number, trackId: number, position: number) {
        return this.prisma.album_Tracks.create({
            data: {
                album_id: albumId,
                track_id: trackId,
                track_position: position
            }
        });
    }

    async findAlbums(
        filters: Record<string, string | string[] | number>,
        limit: number,
        page: number,
        query: string | null = null,
        fields: string[] | null = null
    ) {
        const skip = (page - 1) * limit;
        const where: Prisma.AlbumsWhereInput = {};

        for (const key in filters) {
            if (filters.hasOwnProperty(key)) {
                const value = filters[key];

                if (Array.isArray(value)) {
                    (where as any)[key] = { in: value };
                } else if (typeof value === 'number') {
                    (where as any)[key] = value;
                } else {
                    (where as any)[key] = { contains: value, mode: 'insensitive' };
                }
            }
        }

        if (query) {
            where.OR = [
                { name: { contains: query } },
            ];
        }

        const select: Prisma.AlbumsSelect = {};
        if (fields) {
            fields.forEach(field => {
                (select as any)[field] = true;
            });
        } else {
            select.id = true;
            select.name = true;
            select.release_date = true;
            select.info = true;
            select.front_cover_path = true;
            select.back_cover_path = true;
        }

        const [albums, totalCount] = await Promise.all([
            this.prisma.albums.findMany({
                where,
                skip,
                take: limit,
                select,
                orderBy: {
                    name: 'asc'
                }
            }),
            this.prisma.albums.count({ where })
        ]);

        return {
            data: albums,
            total: totalCount,
            page,
            limit,
            totalPages: Math.ceil(totalCount / limit),
        };
    }

    async createAlbum(data: CreateAlbumRequest) {
        const prisma = this.prisma as PrismaClient;
        return prisma.$transaction(async (tx) => {
            const genreRepo = new GenreRepository(tx as PrismaClient);
            const writerRepo = new WriterRepository(tx as PrismaClient);
            const moodRepo = new MoodRepository(tx as PrismaClient);
            const tagRepo = new TagRepository(tx as PrismaClient);
            const trackRepo = new TrackRepository(tx as PrismaClient);
            const artistRepo = new ArtistRepository(tx as PrismaClient);

            const { 
                genres, 
                moods, 
                tags, 
                writers, 
                tracks, 
                artists,
                ...albumData 
            } = data;

            const newAlbum = await (tx as PrismaClient).albums.create({
                data: {
                    name: albumData.name,
                    release_date: albumData.release_date,
                    info: albumData.info,
                    label_id: albumData.label_id,
                    producer_id: albumData.producer_id,
                    front_cover_path: albumData.front_cover_path,
                    back_cover_path: albumData.back_cover_path,
                }
            });

            await this._handleGenres(tx as PrismaClient, newAlbum.id, genres, genreRepo);
            await this._handleMoods(tx as PrismaClient, newAlbum.id, moods, moodRepo);
            await this._handleTags(tx as PrismaClient, newAlbum.id, tags, tagRepo);
            await this._handleWriters(tx as PrismaClient, newAlbum.id, writers, writerRepo);
            await this._handleTracks(tx as PrismaClient, newAlbum.id, tracks, trackRepo);
            await this._handleArtists(tx as PrismaClient, newAlbum.id, artists, artistRepo);

            return (tx as PrismaClient).albums.findUnique({
                where: { id: newAlbum.id },
                include: {
                    albumGenres: { include: { genre: true } },
                    albumMoods: { include: { mood: true } },
                    albumTags: { include: { tag: true } },
                    albumWriters: { include: { writer: true } },
                    albumTracks: { include: { track: true }, orderBy: { track_position: 'asc' } },
                    albumRatings: true,
                    albumListenHistory: true,
                }
            });
        });
    }
    
    private async _handleGenres(
        tx: PrismaClient, // Тип client всередині транзакції
        albumId: number,
        genresInput: NewOrExistingEntityInput[] | undefined,
        genreRepo: GenreRepository
    ) {
        if (!genresInput || genresInput.length === 0) return;

        const genreIdsToConnect: number[] = [];
        for (const input of genresInput) {
            const genreId = await genreRepo.findOrCreateGenreId(input);
            genreIdsToConnect.push(genreId);
        }

        if (genreIdsToConnect.length > 0) {
            await tx.album_Genres.createMany({
                data: genreIdsToConnect.map(id => ({
                    album_id: albumId,
                    genre_id: id,
                }))
            });
        }
    }

    private async _handleMoods(
        tx: PrismaClient,
        albumId: number,
        moodsInput: NewOrExistingEntityInput[] | undefined,
        moodRepo: MoodRepository
    ) {
        if (!moodsInput || moodsInput.length === 0) return;

        const moodIdsToConnect: number[] = [];
        for (const input of moodsInput) {
            const moodId = await moodRepo.findOrCreateMoodId(input);
            moodIdsToConnect.push(moodId);
        }

        if (moodIdsToConnect.length > 0) {
            await tx.album_Moods.createMany({
                data: moodIdsToConnect.map(id => ({
                    album_id: albumId,
                    mood_id: id,
                })),
            });
        }
    }

    private async _handleTags(
        tx: PrismaClient,
        albumId: number,
        tagsInput: NewOrExistingEntityInput[] | undefined,
        tagRepo: TagRepository
    ) {
        if (!tagsInput || tagsInput.length === 0) return;

        const tagIdsToConnect: number[] = [];
        for (const input of tagsInput) {
            const tagId = await tagRepo.findOrCreateTagId(input);
            tagIdsToConnect.push(tagId);
        }

        if (tagIdsToConnect.length > 0) {
            await tx.album_Tags.createMany({
                data: tagIdsToConnect.map(id => ({
                    album_id: albumId,
                    tag_id: id,
                })),
            });
        }
    }

    private async _handleWriters(
        tx: PrismaClient,
        albumId: number,
        writersInput: NewOrExistingEntityInput[] | undefined,
        writerRepo: WriterRepository
    ) {
        if (!writersInput || writersInput.length === 0) return;

        const writerIdsToConnect: number[] = [];
        for (const input of writersInput) {
            const writerId = await writerRepo.findOrCreateWriterId(input);
            writerIdsToConnect.push(writerId);
        }

        if (writerIdsToConnect.length > 0) {
            await tx.album_Writers.createMany({
                data: writerIdsToConnect.map(id => ({
                    album_id: albumId,
                    writer_id: id,
                }))
            });
        }
    }

    private async _handleTracks(
        tx: PrismaClient,
        albumId: number,
        tracksInput: NewOrExistingTrackInput[] | undefined,
        trackRepo: TrackRepository
    ) {
        if (!tracksInput || tracksInput.length === 0) return;

        const albumTracksToCreate: Array<{ album_id: number; track_id: number; track_position: number }> = [];
        for (const trackInput of tracksInput) {
            const trackId = await trackRepo.findOrCreateTrackId(trackInput);
            albumTracksToCreate.push({
                album_id: albumId,
                track_id: trackId,
                track_position: trackInput.track_position,
            });
        }

        if (albumTracksToCreate.length > 0) {
            await tx.album_Tracks.createMany({
                data: albumTracksToCreate
            });
        }
    }

    private async _handleArtists(
        tx: PrismaClient,
        albumId: number,
        artistsInput: NewOrExistingEntityInput[] | undefined,
        artistRepo: ArtistRepository
    ) {
        if (!artistsInput || artistsInput.length === 0) return;

        const artistIdsToConnect: number[] = [];
        for (const input of artistsInput) {
            const artistId = await artistRepo.findOrCreateArtistId(input);
            artistIdsToConnect.push(artistId);
        }

        if (artistIdsToConnect.length > 0) {
            await tx.Album_Artists.createMany({ 
                data: artistIdsToConnect.map(id => ({
                    album_id: albumId,
                    artist_id: id,
                }))
            });
        }
    }
}