import { NextRequest, NextResponse } from 'next/server';
import { GenreController } from '@/app/controllers/GenreController';

export async function PUT(req: NextRequest) {
    try {
        const controller = new GenreController();
        const response = await controller.updateGenre(req);

        return NextResponse.json(response);
    } catch (error: any) {
        NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const genreController = new GenreController();
        const response = await genreController.getGenre(req);
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function DELETE(req: NextRequest) {
    try {
        const genreController = new GenreController();
        const response = await genreController.deleteGenre(req);
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}