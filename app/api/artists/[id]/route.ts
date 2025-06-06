import { NextRequest, NextResponse } from "next/server";
import { ArtistController } from "../../controllers/ArtistController";

const controller = new ArtistController();

export async function GET(req: NextRequest) {
    try {
        const artist = await controller.getArtist(req);

        return NextResponse.json(artist);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const updatedArtist = await controller.updateArtist(req);

        return NextResponse.json({ message: "Succesfully updated an album!", data: updatedArtist});
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const deletedArtist = await controller.deleteArtist(req);

        return NextResponse.json({ message: "Succesfully deleted an album!", data: deletedArtist});
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}