//export const remote_url = "https://stiflix.vercel.app";
export const remote_url = "http://localhost:8080/api/v2";

const apiFetch = async (url, options = {}) => {
    const res = await fetch(url, {
        credentials: "include",
        ...options,
        headers: {
            Accept: "application/json",
            ...(options.headers || {})
        }
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
    }

    return res.json();
};


/** * API used to get user information.
 *
 * @param token - The authentication token.
 * @returns JSON object of user information.
 * */
export const getUser = (token) =>
    apiFetch(`${remote_url}/users/me`, {
        headers: { Authorization: `Bearer ${token}` }
    });

/** * API used to update user verification status.
 *
 * @param token
 * @returns {Promise<Response>}
 */
export const updateUserVerification = (token) =>
    apiFetch(`${remote_url}/users`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` }
    });

/** * API used to create a new user.
 *
 * @param user
 * @param token
 * @returns {Promise<Response>}
 */
export const createUser = (user, token) =>
    apiFetch(`${remote_url}/users`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

/**
 * API used to get popular movies(only).
 *
 * @returns JSON object of popular movies.
 * */
export const getPopularMovies = () =>
    apiFetch(`${remote_url}/movies/popularMovies`);

/**
 * API used to get popular TV shows(only).
 *
 * @returns JSON object of popular TV shows.
 * */
export const getPopularTvShows = () =>
    apiFetch(`${remote_url}/movies/popularTvShows`);

/**
 * API used to get top-rated movies(only).
 *
 * @returns JSON object of top-rated movies.
 * */
export const getTopRatedMovies = () =>
    apiFetch(`${remote_url}/movies/topRatedMovies`);

/**
 * API used to get top-rated TV shows(only).
 *
 * @returns JSON object of top-rated TV shows.
 * */
export const getTopRatedTvShows = () =>
    apiFetch(`${remote_url}/movies/topRatedTvShows`);

/**
 * API used to get all trending movies and TV shows.
 *
 * @returns JSON object of trending movies and TV shows.
 * */
export const getTrendingMovies = () =>
    apiFetch(`${remote_url}/movies/trendingMovies`);

/**
 * API used to get TV show details.
 *
 * @param id - The ID of the TV show.
 * @returns JSON object of TV show details.
 * */
export const getTvShowDetails = (id) =>
    apiFetch(`${remote_url}/movies/tvShowDetails/${id}`);

/**
 * API used to discover movies.
 *
 * @param page page of the results.
 * @return json with movie data.
 * */
export const discoverMovies = (page) =>
    apiFetch(`${remote_url}/movies/discoverMovies?page=${page}`);

/**
 * API used to discover tv shows.
 *
 * @param page page of the results.
 * @return json with tv show data.
 * */
export const discoverTvShows = (page) =>
    apiFetch(`${remote_url}/movies/discoverTvShows?page=${page}`);

/**
 * API used to get the details of a media. The API defines if the media
 * is a movie or a tv show.
 *
 * @param id id of the media.
 * @param mediaType movie or tv show.
 * @return returns a json with media details.
 * */
export const mediaDetails = (id, mediaType) =>
    apiFetch(
        `${remote_url}/movies/details/${mediaType}/${id}`
    );

/**
 * API used to get the episodes of a tv show.
 *
 * @param id id of the tv show.
 * @param seasons season of the tv show.
 * @return json with tv show seasons/episodes.
 * */
export const getTvShowsSeasons = async (id, seasons) => {
    const requests = Array.from({ length: seasons }, (_, i) =>
        apiFetch(
            `${remote_url}/movies/tv/${id}/seasons/${i + 1}`
        )
    );
    return Promise.all(requests);
};


/**
 * API used to get media genres.
 *
 * @param id id of the media.
 * @param mediaType movie or tv show.
 * @return a list of details.
 * */
export const mediaGenres = (id, mediaType) =>
    apiFetch(
        `${remote_url}/movies/genres/${id}/${mediaType}`
    );

/**
 * API used to get movie trailer.
 *
 * @param id id of the movie.
 * @param mediaType movie or tv show.
 * @return youtube key of the trailer.
 * */
export const getTrailerKey = (id, mediaType) =>
    apiFetch(
        `${remote_url}/movies/trailer/${mediaType}/${id}`
    );

/**
 * API used to search for movies and tv shows.
 *
 * @param query search query.
 * @return json with search results.
 * */
export const search = (query) =>
    apiFetch(
        `${remote_url}/movies/search/${encodeURIComponent(query)}`
    );

/**
 * API used to get logos of a movie title.
 *
 * @param id id of the movie.
 * @param mediaType movie or tv show.
 * @return json with logos.
 * */
export const getLogos = (id, mediaType) =>
    apiFetch(
        `${remote_url}/movies/logos/${mediaType}/${id}`
    );