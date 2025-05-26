import {ArtistType} from "./Artist";

export type AlbumDetailedRating = {
    technicalProficiency?: number;
    songEnjoyability?: number;
    concept?: number;
    historicalImpact?: number;
    consistency?: number;
    personalImpact?: number;
};

export type AlbumData = {
    id: number;
    title: string;
    artist: ArtistType;
    date: string;
    producer?: string;
    label?: string;
    writers?: string[]; // max 4
    genres?: string[];  // max 10
    moods?: string[];   // max 10
    frontCoverPath?: string;
    backCoverPath?: string;
    tags?: string[];    // max 8
    description?: string;
    overallRating?: number; // 1-10
    detailedRating?: AlbumDetailedRating;
    songIds: string[];
};

export default AlbumData;
