import { AlbumService } from '@/app/services/AlbumService';
import { PrismaClient } from '@prisma/client';
import prisma from '@/app/utils/prisma';

jest.mock('@/app/api/utils/prisma', () => ({
    __esModule: true,
    default: {
        $transaction: jest.fn(),
    },
}));

describe('AlbumService', () => {
    it('створює альбом через транзакцію', async () => {
        const service = new AlbumService();

        const mockTx = {
            albums: {
                create: jest.fn().mockResolvedValue({ id: 123, name: 'Test Album' }),
            },
        };

        (prisma.$transaction as jest.Mock).mockImplementation(async (callback) => {
            return callback(mockTx);
        });

        const data = {
            name: 'Test Album',
            artist: { id: 1 },
            release_date: '01-01-2025',
            genres: [],
            moods: [],
            tags: [],
            writers: [],
            tracks: [],
        };

        const result = await service.createAlbum(data);

        expect(result).toEqual({ id: 123, name: 'Test Album' });
        expect(mockTx.albums.create).toHaveBeenCalled();
        expect(prisma.$transaction).toHaveBeenCalled();
    });
});