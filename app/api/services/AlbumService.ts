import { InputAlbumData, InputGenre } from '@/app/api/types/InputDefinitions';
import prisma from '@/app/api/utils/prisma';
import { GenreService } from './GenreService';
import { MoodService } from './MoodService';
import { TagService } from './TagService';
import { WriterService } from './WriterService';
import { PrismaClient, Prisma } from '@prisma/client';
import { TrackService } from './TrackService';

export class AlbumService {
    constructor() {}

    async createAlbum(data: InputAlbumData) {
        return await prisma.$transaction(async (tx) => {
            const genreService = new GenreService(tx);
            const moodService = new MoodService(tx);
            const tagService = new TagService(tx);
            const writerService = new WriterService(tx);
            const trackService = new TrackService(tx);

            return await this.createAlbumInsideTx(data, tx, {genreService, moodService, tagService, writerService, trackService});
        });
    }

    async createAlbumInsideTx(data: InputAlbumData, tx: Prisma.TransactionClient, {genreService, moodService, tagService, writerService, trackService}: any) {
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
    
}