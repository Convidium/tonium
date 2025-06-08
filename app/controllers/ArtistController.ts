import { InputArtist } from '@/app/types/InputDefinitions';
import { ArtistService } from '@/app/services/ArtistService';
import { NextRequest, NextResponse } from 'next/server';
import { FileService } from '../services/FileService';
import { RequestParser } from '../utils/RequestParser';
import { ExistingArtist } from '../types/serviceLayerDefinitions';

const fileService = new FileService();

export class ArtistController {
    private artistService = new ArtistService();

    constructor() { }

    async createArtist(formData: FormData) {
        const artistJson = formData.get('artist_data');
        if (!artistJson || typeof artistJson !== 'string') {
            return NextResponse.json({ error: 'Invalid artist data' }, { status: 400 });
        }
        const artistData: InputArtist = JSON.parse(artistJson as string);


        console.log('[Controller] Creating the artist:', artistData.artist_name);
        const artist_logo = formData.get('artist_cover') as File | null;

        if (artist_logo) {
            artistData.artist_logo_path = await fileService.save(artist_logo, 'artist_covers');
        }

        const artist = await this.artistService.createArtist(artistData);
        console.log('[Controller] The Artist has beend created, id =', artist.id);
        return artist;
    }

    async getArtists(req: NextRequest) {
        const parser = new RequestParser(req);
        const fullQuery = parser.parseQueryParams();

        return await this.artistService.getArtists(fullQuery);
    }

    async getArtist(req: NextRequest) {
        const parser = new RequestParser(req);

        const id = parser.getId("artists");

        return await this.artistService.getArtistById(Number(id));
    }

    async updateArtist(req: NextRequest) {
        const formData = await req.formData();

        const artistJson = formData.get('artist_data');
        if (!artistJson || typeof artistJson !== 'string') {
            return NextResponse.json({ error: 'Invalid artist data' }, { status: 400 });
        }
        const artistData: ExistingArtist = JSON.parse(artistJson as string);


        console.log('[Controller] Creating the artist:', artistData.artist_name);
        const artist_logo = formData.get('artist_cover') as File | null;

        if (artist_logo) {
            artistData.artist_logo_path = await fileService.save(artist_logo, 'covers');
        }

        const artist = await this.artistService.updateArtist(artistData);
        console.log('[Controller] The Artist has beend updated, id =', artist.id);
        return artist;
    }

    async deleteArtist(req: NextRequest) {
        const parser = new RequestParser(req);
        const id = parser.getId("artists");

        if (id === null || isNaN(id)) {
            return NextResponse.json({ error: 'Invalid artist id' }, { status: 400 });
        }

        // TODO: Implement artist cover file deletion
        console.log("[Controller] The artist was deleted succesfully ", id);
        return await this.artistService.deleteArtist(id);
    }
}