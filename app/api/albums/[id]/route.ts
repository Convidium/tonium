import { NextRequest, NextResponse } from "next/server";
import { AlbumController } from "../../controllers/AlbumController";

export async function GET(req: NextRequest) {
    try {
        const controller = new AlbumController();
        const album = await controller.getAlbum(req);

        return NextResponse.json(album);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}