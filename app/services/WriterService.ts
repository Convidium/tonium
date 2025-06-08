import { InputWriter } from '@/app/types/InputDefinitions';
import prisma from '@/app/utils/prisma';
import { Prisma, PrismaClient } from '@prisma/client';

export class WriterService {
    constructor(private tx: Prisma.TransactionClient = prisma) {}

    public async processInputWriters(inputTags: InputWriter[]): Promise<number[]> {
        return await this.prepareWriters(inputTags);
    }
    
    public async bindWritersToAlbum(albumId: number, writerIds: number[]) {
        if (writerIds.length === 0) return;
        await this.tx.album_Writers.createMany({
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
                const created = await this.tx.writers.upsert({
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