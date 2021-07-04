export interface LoginRequest {
    email: string,
    password: string
}

export interface SignupRequest {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export interface RefreshTokenRequest {
    token: string,
    refreshToken: string
}
export interface GetFilteredMoviesRequest {
    countries: string[],
    genres: string[]
}