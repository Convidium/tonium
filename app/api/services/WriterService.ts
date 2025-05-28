import { InputWriter } from '@/app/api/types/InputDefinitions';
import prisma from '@/app/api/utils/prisma';

export class WriterService {
    constructor() { }

    public async processInputWriters(inputTags: InputWriter[]): Promise<number[]> {
        return await this.prepareWriters(inputTags);
    }
    
    public async bindWritersToAlbum(albumId: number, writerIds: number[]) {
        if (writerIds.length === 0) return;
        await prisma.album_Writers.createMany({
            data: writerIds.map((id) => ({
                album_id: albumId,
                writer_id: id,
            }))
        });
    }

    private async prepareWriters(writers: InputWriter[]): Promise<number[]> {
        const ids: number[] = [];

        for (const w of writers) {
            if (w.isNew && w.writer_name) {
                const created = await prisma.writers.upsert({
                    where: { writer_name: w.writer_name },
                    update: {},
                    create: { writer_name: w.writer_name },
                });
                ids.push(created.writer_id);
            } else if (w.writer_id) {
                ids.push(w.writer_id);
            }
        }

        return ids;
    }
}