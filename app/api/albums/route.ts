import { NextRequest, NextResponse } from 'next/server';
import { AlbumController } from '@/app/controllers/AlbumController';

export async function POST(req: NextRequest) {
    const formData = await req.formData();

    const controller = new AlbumController();
    const result = await controller.createAlbum(formData);

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