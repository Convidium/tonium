import { InputMood } from '@/app/types/InputDefinitions';
import prisma from '@/app/utils/prisma';
import { Prisma, PrismaClient } from '@prisma/client';

export class MoodService {
    constructor(private tx: Prisma.TransactionClient = prisma) {}

    public async processInputMoods(inputGenres: InputMood[]): Promise<number[]> {
        return await this.prepareMoods(inputGenres);
    }
    
    public async bindMoodsToAlbum(albumId: number, moodIds: number[]) {
        if (moodIds.length === 0) return;
        await this.tx.album_Moods.createMany({
            data: moodIds.map((id) => ({
                album_id: albumId,
                mood_id: id,
            }))
        });
    }

    private async prepareMoods(moods: InputMood[]): Promise<number[]> {
        const ids: number[] = [];

        for (const m of moods) {
            if (m.isNew && m.name) {
                const created = await this.tx.moods.upsert({
                    where: { name: m.name },
                    update: {},
                    create: { name: m.name },
                });
                ids.push(created.id);
            } else if (m.id) {
                ids.push(m.id);
            }
        }

        return ids;
    }
}