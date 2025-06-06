import { NextRequest, NextResponse } from 'next/server';
import { ArtistController } from '@/app/api/controllers/ArtistController';

export async function POST(req: NextRequest) {
    const formData = await req.formData();

    const controller = new ArtistController();
    const result = await controller.createArtist(formData);

    return NextResponse.json(result);
}

export async function GET(req: NextRequest) {
    try {
        const artistController = new ArtistController();
        const response = await artistController.getArtists(req);
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}