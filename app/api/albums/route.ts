import { NextRequest, NextResponse } from 'next/server';
import { FileService } from '@/app/api/services/FileService';
import { InputAlbumData } from '@/app/api/types/InputDefinitions';
import { AlbumController } from '@/app/api/controllers/AlbumController';
import { RequestParser } from '../utils/RequestParser';
import { AlbumService } from '../services/AlbumService';

const fileService = new FileService();

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const albumJson = formData.get('album_data');

    if (!albumJson || typeof albumJson !== 'string') {
        return NextResponse.json({ error: 'Invalid album data' }, { status: 400 });
    }
    const albumData: InputAlbumData = JSON.parse(albumJson as string);

    const frontCover = formData.get('front_cover') as File | null;
    const backCover = formData.get('back_cover') as File | null;
    const audioFiles = formData.getAll('audiofiles') as File[];

    if (frontCover) {
        albumData.front_cover_path = await fileService.save(frontCover, 'covers');
    }
    if (backCover) {
        albumData.back_cover_path = await fileService.save(backCover, 'covers');
    }
    if (albumData.tracks && audioFiles.length === albumData.tracks.length) {
        for (let i = 0; i < albumData.tracks.length; i++) {
            albumData.tracks[i].track.track_path = await fileService.save(audioFiles[i], 'audiofiles');
        }
    }

    const controller = new AlbumController();
    const result = await controller.createAlbum(albumData);

    return NextResponse.json(result);
}

export async function GET(req: NextRequest) {
    try {
        const albumController = new AlbumController();
        const response = await albumController.getAlbums(req);
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}