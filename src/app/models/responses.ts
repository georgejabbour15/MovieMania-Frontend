import { Country } from "./country";
import { Genre } from "./genre";
import { IMovie, RatedMovie } from "./movie";
import { IUser } from "./user";

export interface AuthResponse {
    token: string,
    refreshToken: string,
    user: IUser
}

export interface GetGenresResponse {
    data: Genre[]
}

export interface GetCountriesResponse {
    data: Country[]
}

export interface GetMoviesResponse {
    data: IMovie[]
}

export interface GetRatedMoviesResponse {
    data: RatedMovie[]
}