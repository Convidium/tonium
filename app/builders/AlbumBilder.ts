import { AlbumData, AlbumDetailedRating } from '@/app/interfaces/Album';

export class AlbumBuilder {
    private album: Partial<AlbumData> = {};

    setTitle(title: string) {
        console.log(title);
        
        this.album.title = title;
        return this;
    }

    setArtist(artist: any) {
        this.album.artist = artist;
        return this;
    }

    setDate(date: string) {
        if (!date) return this;

        this.album.date = date;
        return this;
    }

    setProducer(producer: string) {
        if (!producer) return this;

        this.album.producer = producer;
        return this;
    }

    setLabel(label: string) {
        if (!label) return this;

        this.album.label = label;
        return this;
    }

    setWriters(writers: string[]) {
        if (!writers) return this;

        this.album.writers = writers.slice(0, 4);
        return this;
    }

    setGenres(genres: string[], max = 5) {
        if (!genres) return this;

        this.album.genres = genres.slice(0, max);
        return this;
    }

    setMoods(moods: string[], max = 5) {
        if (!moods) return this;

        this.album.moods = moods.slice(0, max);
        return this;
    }

    setFrontCoverPath(path: string) {
        if (!path) return this;

        this.album.frontCoverPath = path;
        return this;
    }

    setBackCoverPath(path: string) {
        if (!path) return this;

        this.album.backCoverPath = path;
        return this;
    }

    setTags(tags: string[]) {
        if (!tags) return this;

        this.album.tags = tags.slice(0, 8);
        return this;
    }

    setDescription(description: string) {
        if (!description) return this;

        this.album.description = description;
        return this;
    }

    setOverallRating(rating: number) {
        if (!rating) return this;

        this.album.overallRating = rating;
        return this;
    }

    setDetailedRating(rating: AlbumDetailedRating) {
        if (!rating) return this;

        this.album.detailedRating = rating;
        return this;
    }

    setSongIds(songIds: string[]) {
        if (!songIds) return this;

        this.album.songIds = songIds;
        return this;
    }

    build(): AlbumData {
        // TODO add validation here for required fields
        if (!this.album.title || !this.album.artist) {
            throw new Error("Missing required album fields");
        }
        return this.album as AlbumData;
    }
}