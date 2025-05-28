import { InputAlbumData, InputGenre } from '@/app/api/types/InputDefinitions';
import prisma from '@/app/api/utils/prisma';
import { GenreService } from './GenreService';
import { MoodService } from './MoodService';
import { TagService } from './TagService';
import { WriterService } from './WriterService';

export class AlbumService {
    constructor() { }

    async createAlbum(data: InputAlbumData) {
        console.log('[Service] Створюємо альбом:', data.name);
        const genreService = new GenreService();
        const moodService = new MoodService();
        const tagService = new TagService();
        const writerService = new WriterService();
        
        const genreIds = await genreService.processInputGenres(data.genres || []);
        const moodIds = await moodService.processInputMoods(data.moods || []);
        const tagIds = await tagService.processInputTags(data.moods || []);
        const writerIds = await writerService.processInputWriters(data.moods || []);

        const album = await prisma.albums.create({
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

        console.log('[Service] Базовий альбом створено, id =', album.id);
        return album;
    }
}