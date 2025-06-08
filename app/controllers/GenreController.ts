import { NextRequest } from "next/server";
import { GenreService } from "../services/GenreService";
import { InputGenre } from "../types/InputDefinitions";
import { RequestParser } from "../utils/RequestParser";
import { ExistingGenre } from "../types/serviceLayerDefinitions";

export class GenreController {
    private genreService = new GenreService();

    constructor() { }

    async createGenre(req: NextRequest) {
        const genreJson = await req.json();

        if (!genreJson || typeof genreJson !== "object") {
            throw new Error("Invalid genre data");
        }

        const genre: InputGenre = genreJson;
        const createdGenre: ExistingGenre = await this.genreService.createGenre(genre);

        return createdGenre;
    }

    async getGenres(req: NextRequest) {
        const parser = new RequestParser(req);
        const fullQuery = parser.parseQueryParams();

        return this.genreService.getGenres(fullQuery);
    }

    async getGenre(req: NextRequest) {
        const parser = new RequestParser(req);
        const id = parser.getId("genres");

        if (id === null || isNaN(id)) {
            throw new Error("Invalid genre id!");
        }

        return await this.genreService.getGenreById(Number(id));
    }

    async deleteGenre(req: NextRequest) {
        const parser = new RequestParser(req);
        const id = parser.getId("genres");

        return await this.genreService.deleteGenre(Number(id));
    }

    async updateGenre(req: NextRequest) {
        const genreJson = await req.json();

        if (!genreJson || typeof genreJson !== "object") {
            throw new Error("Invalid genre data");
        }

        const genre: ExistingGenre = genreJson;
        const updatedGenre: ExistingGenre = await this.genreService.updateGenre(genre);

        return updatedGenre;
    }
}