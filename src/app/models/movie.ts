import { Country } from "./country";
import { Genre } from "./genre";

export interface IMovie {
    id: string;
    name: string;
    descritpion: string,
    releaseDate: Date,
    imbdLink: string,
    imbdId: number,
    thumbnailUrl: string,
    genres: Genre[],
    countries: Country[]
}
export interface RatedMovie {
    id: string;
    name: string;
    descritpion: string,
    releaseDate: Date,
    imbdLink: string,
    imbdId: number,
    thumbnailUrl: string,
    genres: Genre[],
    countries: Country[],
    rating: number
}