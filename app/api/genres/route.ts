import { NextRequest, NextResponse } from 'next/server';
import { GenreController } from '@/app/controllers/GenreController';

export async function POST(req: NextRequest) {
    try {
        const controller = new GenreController();
        const response = await controller.createGenre(req);

        return NextResponse.json(response);
    } catch (error: any) {
        NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const genreController = new GenreController();
        const response = await genreController.getGenres(req);
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}