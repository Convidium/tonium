import { InputAlbumData, InputGenre } from '@/app/api/types/InputDefinitions';
import prisma from '@/app/api/utils/prisma';
import { GenreService } from './GenreService';
import { MoodService } from './MoodService';
import { TagService } from './TagService';
import { WriterService } from './WriterService';
import { PrismaClient, Prisma } from '@prisma/client';
import { TrackService } from './TrackService';
import { buildPrismaQuery, BuildPrismaQueryOptions } from '../utils/buildAlbumQuery';
import parseInclude from '../utils/parseInclude';

export class AlbumService {
    constructor() { }

    async createAlbum(data: InputAlbumData) {
        return await prisma.$transaction(async (tx) => {
            const genreService = new GenreService(tx);
            const moodService = new MoodService(tx);
            const tagService = new TagService(tx);
            const writerService = new WriterService(tx);
            const trackService = new TrackService(tx);

            return await this.createAlbumInsideTx(data, tx, { genreService, moodService, tagService, writerService, trackService });
        });
    }

    async createAlbumInsideTx(data: InputAlbumData, tx: Prisma.TransactionClient, { genreService, moodService, tagService, writerService, trackService }: any) {
        console.log('[Service] Creating an Album...', data.name);

        const genreIds = await genreService.processInputGenres(data.genres || []);
        const moodIds = await moodService.processInputMoods(data.moods || []);
        const tagIds = await tagService.processInputTags(data.tags || []);
        const writerIds = await writerService.processInputWriters(data.writers || []);
        const albumTracks = await trackService.processInputTracks(data.tracks || []);

        const album = await tx.albums.create({
            data: {
                name: data.name,
                release_date: data.release_date,
                info: data.info,
                label_id: data.label_id || null,
                producer_id: data.producer_id || null,
                artist: { connect: { id: Number(data.artist.id) } },
                front_cover_path: data.front_cover_path || null,
                back_cover_path: data.back_cover_path || null,
            },
        });

        await genreService.bindGenresToAlbum(album.id, genreIds);
        await moodService.bindMoodsToAlbum(album.id, moodIds);
        await tagService.bindTagsToAlbum(album.id, tagIds);
        await writerService.bindWritersToAlbum(album.id, writerIds);
        await trackService.bindTracksToAlbum(album.id, albumTracks);

        console.log('[Service] Album has been succesfully created! id =', album.id);
        return album;
    }

    async updateAlbum(data: InputAlbumData) {
        return await prisma.$transaction(async (tx) => {
            const genreService = new GenreService(tx);
            const moodService = new MoodService(tx);
            const tagService = new TagService(tx);
            const writerService = new WriterService(tx);
            const trackService = new TrackService(tx);

            return await this.updateAlbumInsideTx(data, tx, {
                genreService,
                moodService,
                tagService,
                writerService,
                trackService,
            });
        });
    }

    async deleteAlbum(albumId: number) {
        return await prisma.$transaction(async (tx) => {
            const album = await tx.albums.findUnique({
                where: { id: albumId },
            });

            if (!album) {
                throw new Error(`No album with id ${albumId} was found.`);
            }

            await tx.albums.delete({
                where: { id: albumId },
            });

            console.log(`[Service] Album has been succesfully deleted: id = ${albumId}`);
            return { success: true, id: albumId };
        });
    }

    async getAlbums(options: BuildPrismaQueryOptions) {
        const query = buildPrismaQuery(options);

        const albums = await prisma.albums.findMany({
            ...query,
            include: query.include ? query.include : undefined
        });


        return albums;
    }

    async getAlbumById(id: number | null, include?: string[]) {
        if (id === null) {
            throw new Error('Album Not Found');
        }
        
        const includeObj = (include ? parseInclude(include) : {
                artist: true,
                albumGenres: { include: { genre: true } },
                albumMoods: { include: { mood: true } },
                albumTags: { include: { tag: true } },
                albumWriters: { include: { writer: true } },
                albumTracks: {
                    include: { track: true },
                    orderBy: { track_position: 'asc' },
                },
            });

        const album = await prisma.albums.findUnique({
            where: { id },
            include: includeObj
        });

        if (!album) throw new Error('Album Not Found');
        return album;
    }

    async updateAlbumInsideTx(
        data: InputAlbumData,
        tx: Prisma.TransactionClient,
        { genreService, moodService, tagService, writerService, trackService }: any
    ) {
        console.log('[Service] Updating an album:', data.name);

        const album = await tx.albums.update({
            where: { id: Number(data.id) },
            data: {
                name: data.name,
                release_date: data.release_date,
                info: data.info,
                label_id: data.label_id || null,
                producer_id: data.producer_id || null,
                artist: { connect: { id: Number(data.artist.id) } },
                front_cover_path: data.front_cover_path || null,
                back_cover_path: data.back_cover_path || null,
            },
        });

        const genreIds = await genreService.processInputGenres(data.genres || []);
        const moodIds = await moodService.processInputMoods(data.moods || []);
        const tagIds = await tagService.processTagsGenres(data.tags || []);
        const writerIds = await writerService.processInputWriters(data.writers || []);
        const trackIds = await trackService.processInputTracks(data.tracks || []);

        await tx.album_Genres.deleteMany({ where: { album_id: album.id } });
        await genreService.bindGenresToAlbum(album.id, genreIds);

        await tx.album_Moods.deleteMany({ where: { album_id: album.id } });
        await moodService.bindMoodsToAlbum(album.id, moodIds);

        await tx.album_Tags.deleteMany({ where: { album_id: album.id } });
        await tagService.bindTagsToAlbum(album.id, tagIds);

        await tx.album_Writers.deleteMany({ where: { album_id: album.id } });
        await writerService.bindWritersToAlbum(album.id, writerIds);

        await tx.album_Tracks.deleteMany({ where: { album_id: album.id } });
        await trackService.bindTracksToAlbum(album.id, trackIds);

        return album;
    }
}