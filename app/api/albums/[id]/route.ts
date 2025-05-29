import { NextRequest, NextResponse } from "next/server";
import { AlbumService } from "../../services/AlbumService";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id);
        if (isNaN(id)) {
            return NextResponse.json({ error: 'Invalid album id' }, { status: 400 });
        }

        const albumService = new AlbumService();
        const album = await albumService.getAlbumById(id);

        return NextResponse.json(album);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}