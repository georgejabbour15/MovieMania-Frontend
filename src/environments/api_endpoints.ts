export const enum AUTH_ENDPOINTS {
  LOGIN = 'api/v1/auth/login',
  SIGNUP = 'api/v1/auth/register',
  REFRESH_TOKEN = 'api/v1/auth/refresh-token',
  LOGOUT = 'api/v1/auth/logout',

}

export const enum MOVIES_ENDPOINTS {
  GET_GENRES = 'api/v1/movie/get-genre',
  GET_COUNTRIES = 'api/v1/movie/get-country',
  GET_ALL_MOVIES = 'api/v1/movie/get-all-movies',
  GET_MOVIE_BY_ID = 'api/v1/movie/movieId',
  GET_MOVIE_BY_NAME = 'api/v1/movie/get-movie-by-name',
  GET_FILTERED_MOVIES = 'api/v1/movie/get-filtered-movies',
}
export const enum RATING_ENDPOINTS {
  RATE_MOVIE = 'api/v1/movie/movieId/rate',
  DELETE_RATING = 'api/v1/movie/movieId',
  GET_USER_MOVIES = 'api/v1/movie/get-user-rated-movies',
}