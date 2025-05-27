import { NextRequest, NextResponse } from 'next/server';
import { RequestParser } from '@/app/api/utils/RequestParser';
import { AlbumRepository } from '@/app/api/repositories/AlbumRepository';
import { CreateAlbumRequest } from '../types/definitions';

const albumRepository = new AlbumRepository();

export async function GET(request: NextRequest) {
    try {
        const parser = new RequestParser(request);

        const filters = parser.getFilters();
        const limit = parser.getLimit();
        const page = parser.getPage();
        const query = parser.getQueryParam();
        const fields = parser.getFields();

        const result = await albumRepository.findAlbums(filters, limit, page, query, fields);
        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        console.error('Failed to search for albums', error);
        return NextResponse.json({ message: 'Server returned error, while searching for albums: ' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const albumData: CreateAlbumRequest = await request.json();

        if (!albumData.name || albumData.name.trim() === '') {
            return NextResponse.json({ error: 'Album name is required.' }, { status: 400 });
        }
        if (!albumData.release_date || albumData.release_date.trim() === '') {
            return NextResponse.json({ error: 'Release date is required.' }, { status: 400 });
        }
        const newAlbum = await albumRepository.createAlbum(albumData);

        return NextResponse.json(newAlbum, { status: 201 });

    } catch (error: any) {
        console.error('Error creating album:', error);

        return NextResponse.json({ error: error.message || 'Failed to create album.' }, { status: 500 });
    }
}