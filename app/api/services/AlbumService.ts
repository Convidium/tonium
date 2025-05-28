import { InputAlbumData, InputGenre } from '@/app/api/types/InputDefinitions';
import prisma from '@/app/api/utils/prisma';
import { GenreService } from './GenreService';
import { MoodService } from './MoodService';
import { TagService } from './TagService';
import { WriterService } from './WriterService';
import { PrismaClient } from '@prisma/client';

export class AlbumService {
    constructor() {}
    private genreService = new GenreService();
    private moodService = new MoodService();
    private tagService = new TagService();
    private writerService = new WriterService();

    async createAlbum(data: InputAlbumData) {
    }

    async createAlbumInsideTx(data: InputAlbumData, tx: PrismaClient) {
        console.log('[Service] Створюємо альбом:', data.name);

        const genreIds = await this.genreService.processInputGenres(data.genres || []);
        const moodIds = await this.moodService.processInputMoods(data.moods || []);
        const tagIds = await this.tagService.processInputTags(data.tags || []);
        const writerIds = await this.writerService.processInputWriters(data.writers || []);

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

        await this.genreService.bindGenresToAlbum(album.id, genreIds);
        await this.moodService.bindMoodsToAlbum(album.id, moodIds);
        await this.tagService.bindTagsToAlbum(album.id, tagIds);
        await this.writerService.bindWritersToAlbum(album.id, writerIds);

        console.log('[Service] Базовий альбом створено, id =', album.id);
        return album;
    }
    
}