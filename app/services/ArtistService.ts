import { Artist, ExistingArtist } from "@/app/types/serviceLayerDefinitions";
import prisma from "../utils/prisma";
import { buildPrismaQuery, BuildPrismaQueryOptions } from "../utils/buildAlbumQuery";
import parseInclude from "../utils/parseInclude";

export class ArtistService {
    constructor() { }

    async createArtist(artist: Artist) {
        console.log('[Service] Creating an artist:', artist.artist_name);

        const createdArtist = await prisma.artists.create({
            data: {
                artist_name: artist.artist_name,
                artist_logo_path: artist.artist_logo_path || null,
                active_from: artist.active_from || null,
                active_to: artist.active_to || null
            },
        });

        console.log(`[Service] Artist: ${createdArtist?.artist_name} has been succesfully created!`);
        return createdArtist;
    }

    async updateArtist(artist: ExistingArtist) {
        console.log('[Service] Updating an artist:', artist.artist_name);

        const updatedArtist = await prisma.artists.update({
            where: { id: Number(artist.id) },
            data: {
                artist_name: artist.artist_name,
                artist_logo_path: artist.artist_logo_path || null,
                active_from: artist.active_from || null,
                active_to: artist.active_to || null
            },
        });

        console.log('[Service] Succesfully created an artist:', updatedArtist.artist_name);
        return updatedArtist;
    }

    async deleteArtist(artistId: number) {
        return await prisma.$transaction(async (tx) => {
            const artist = await tx.artists.findUnique({
                where: { id: artistId },
            });

            if (!artist) {
                throw new Error(`No artist with id ${artistId} was found.`);
            }

            await tx.artists.delete({
                where: { id: artistId },
            });

            console.log(`[Service] Artist ${artist.artist_name} has been succesfully deleted!`);
            return { success: true, id: artistId, name: artist.artist_name };
        });
    }

    async getArtists(options: BuildPrismaQueryOptions) {
        const query = buildPrismaQuery(options);

        const artists = await prisma.artists.findMany({
            ...query,
            include: query.include ? query.include : undefined
        });

        return artists;
    }

    async getArtistById(id: number | null) {
        if (id === null) {
            throw new Error('Artist Not Found');
        }

        const artist = await prisma.artists.findUnique({
            where: { id }
        });

        if (!artist) throw new Error('Artist Not Found');
        return artist;
    }
}