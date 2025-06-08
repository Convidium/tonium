import { NextRequest, NextResponse } from "next/server";
import { AlbumController } from "../../../controllers/AlbumController";

export async function GET(req: NextRequest) {
    try {
        const controller = new AlbumController();
        const album = await controller.getAlbum(req);

        return NextResponse.json(album);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const controller = new AlbumController();
        const updatedAlbum = await controller.updateAlbum(req);

        return NextResponse.json({ message: "Succesfully updated an album!", data: updatedAlbum});
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const controller = new AlbumController();
        const deletedAlbum = await controller.deleteAlbum(req);

        return NextResponse.json({ message: "Succesfully deleted an album!", data: deletedAlbum});
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}