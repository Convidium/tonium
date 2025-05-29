import { InputTag } from '@/app/api/types/InputDefinitions';
import prisma from '@/app/api/utils/prisma';
import { Prisma, PrismaClient } from '@prisma/client';

export class TagService {
    constructor(private tx: Prisma.TransactionClient = prisma) {}

    public async processInputTags(inputTags: InputTag[]): Promise<number[]> {
        return await this.prepareTags(inputTags);
    }
    
    public async bindTagsToAlbum(albumId: number, tagIds: number[]) {
        if (tagIds.length === 0) return;
        await this.tx.album_Tags.createMany({
            data: tagIds.map((id) => ({
                album_id: albumId,
                tag_id: id,
            }))
        });
    }

    private async prepareTags(tags: InputTag[]): Promise<number[]> {
        const ids: number[] = [];

        for (const t of tags) {
            if (t.isNew && t.name) {
                const created = await this.tx.tags.upsert({
                    where: { name: t.name },
                    update: {},
                    create: { name: t.name },
                });
                ids.push(created.id);
            } else if (t.id) {
                ids.push(t.id);
            }
        }

        return ids;
    }
}