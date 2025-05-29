import { InputTrack, InputAlbumTrack } from '@/app/api/types/InputDefinitions';
import prisma from '@/app/api/utils/prisma';
import { Prisma, PrismaClient } from '@prisma/client';

export class TrackService {
    constructor(private tx: Prisma.TransactionClient = prisma) {}

    public async processInputTracks(input: InputAlbumTrack[]): Promise<{ trackId: number; position: number }[]> {
        const result: { trackId: number; position: number }[] = [];

        for (const t of input) {
            let trackId: number;

            if (t.track.isNew && t.track.track_name && t.track.track_path) {
                const created = await this.tx.tracks.create({
                    data: {
                        track_name: t.track.track_name,
                        track_path: t.track.track_path,
                    },
                });
                trackId = created.id;
            } else {
                trackId = t.track.track_id;
            }

            result.push({ trackId, position: t.position });
        }

        return result;
    }

    public async bindTracksToAlbum(albumId: number, tracks: { trackId: number; position: number }[]) {
        if (tracks.length === 0) return;
        await this.tx.album_Tracks.createMany({
            data: tracks.map(t => ({
                album_id: albumId,
                track_id: t.trackId,
                track_position: t.position,
            })),
        });
    }
}