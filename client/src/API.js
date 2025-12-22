//export const remote_url = "https://stiflix.vercel.app";
export const remote_url = "http://localhost:8080/api/v2";

/** * API used to get user information.
 *
 * @param token - The authentication token.
 * @returns JSON object of user information.
 * */
const getUser = async (token) => {
    const response = await fetch(`${remote_url}/users/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        }
    });
    return await response.json();
}

/** * API used to update user verification status.
 *
 * @param token
 * @returns {Promise<Response>}
 */
const updateUserVerification = async (token) => {
    return await fetch(`${remote_url}/users/`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        }
    });
}

/** * API used to create a new user.
 *
 * @param user
 * @param token
 * @returns {Promise<Response>}
 */
const createUser = async (user, token) => {
    return await fetch(`${remote_url}/users/`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(user)
    });
}

/**
 * API used to get popular movies(only).
 *
 * @returns JSON object of popular movies.
 * */
const getPopularMovies = async () => {
    const response = await fetch(`${remote_url}/api/popularMovies`, {
        headers: {
            Accept: "application/json"
        }
    });
    return await response.json();
}

/**
 * API used to get popular TV shows(only).
 *
 * @returns JSON object of popular TV shows.
 * */
const getPopularTvShows = async () => {
    const response = await fetch(`${remote_url}/api/popularTvShows`, {
        headers: {
            Accept: "application/json"
        }
    });
    return await response.json();
}

/**
 * API used to get top-rated movies(only).
 *
 * @returns JSON object of top-rated movies.
 * */
const getTopRatedMovies = async () => {
    const response = await fetch(`${remote_url}/api/topRatedMovies`, {
        headers: {
            Accept: "application/json"
        }
    });
    return await response.json();
}

/**
 * API used to get top-rated TV shows(only).
 *
 * @returns JSON object of top-rated TV shows.
 * */
const getTopRatedTvShows = async () => {
    const response = await fetch(`${remote_url}/api/topRatedTvShows`, {
        headers: {
            Accept: "application/json"
        }
    });
    return await response.json();
}

/**
 * API used to get all trending movies and TV shows.
 *
 * @returns JSON object of trending movies and TV shows.
 * */
const getTrendingMovies = async () => {
    const response = await fetch(`${remote_url}/api/trendingMovies`, {
        headers: {
            Accept: "application/json"
        }
    });
    return await response.json();
}

/**
 * API used to get TV show details.
 *
 * @param tvShowId - The ID of the TV show.
 * @returns JSON object of TV show details.
 * */
const getTvShowDetails = async (tvShowId) => {
    const response = await fetch(`${remote_url}/api/tvShowDetails?id=${tvShowId}`, {
        headers: {
            Accept: "application/json"
        }
    });
    return await response.json();
}

/**
 * API used to discover movies.
 *
 * @param page page of the results.
 * @return json with movie data.
 * */
const discoverMovies = async (page) => {
    const response = await fetch(`${remote_url}/api/discoverMovies?page=${page}`, {
        headers: {
            Accept: "application/json"
        }
    });
    return await response.json();
}

/**
 * API used to discover tv shows.
 *
 * @param page page of the results.
 * @return json with tv show data.
 * */
const discoverTvShows = async (page) => {
    const response = await fetch(`${remote_url}/api/discoverTvShows?page=${page}`, {
        headers: {
            Accept: "application/json"
        }
    });
    return await response.json();
}

/**
 * API used to get the details of a media. The API defines if the media
 * is a movie or a tv show.
 *
 * @param id id of the media.
 * @param mediaType movie or tv show.
 * @return returns a json with media details.
 * */
const mediaDetails = async (id, mediaType) => {
    const response = await fetch(`${remote_url}/api/mediaDetails?id=${id}&mediaType=${mediaType}`, {
        headers: {
            Accept: "application/json"
        }
    });
    return await response.json();
}

/**
 * API used to get the episodes of a tv show.
 *
 * @param id id of the tv show.
 * @param seasons season of the tv show.
 * @return json with tv show seasons/episodes.
 * */
const getTvShowsSeasons = async (id, seasons) => {
    const allSeasons = [];
    for (let i = 1; i <= seasons; i++) {
        const response = await fetch(`${remote_url}/api/tvShowsSeasons?id=${id}&season=${i}`, {
            headers: {
                Accept: "application/json"
            }
        });
        const seasonData = await response.json();
        allSeasons.push(seasonData);
    }
    return allSeasons;
}

/**
 * API used to get media genres.
 *
 * @param id id of the media.
 * @param media_type movie or tv show.
 * @return a list of details.
 * */
const mediaGenres = async (id, media_type) => {
    const response = await fetch(`${remote_url}/api/mediaGenres?id=${id}&mediaType=${media_type}`, {
        headers: {
            Accept: "application/json"
        }
    });
    return await response.json();
}

/**
 * API used to get movie trailer.
 *
 * @param movieId id of the movie.
 * @param mediaType movie or tv show.
 * @return youtube key of the trailer.
 * */
const getTrailerKey = async (movieId, mediaType) => {
    const response = await fetch(`${remote_url}/api/trailerKey?id=${movieId}&mediaType=${mediaType}`, {
        headers: {
            Accept: "application/json"
        }
    });
    return await response.json();
}

/**
 * API used to search for movies and tv shows.
 *
 * @param query search query.
 * @return json with search results.
 * */
const search = async (query) => {
    const response = await fetch(`${remote_url}/api/search?query=${query}`, {
        headers: {
            Accept: "application/json"
        }
    });
    return await response.json();
}

/**
 * API used to get logos of a movie title.
 *
 * @param movieId id of the movie.
 * @param mediaType movie or tv show.
 * @return json with logos.
 * */
const getLogos = async (movieId, mediaType) => {
    const response = await fetch(`${remote_url}/api/movieLogos?movieId=${movieId}&mediaType=${mediaType}`, {
        headers: {
            Accept: "application/json"
        }
    });

    return await response.json();
}

export {
    getUser,
    updateUserVerification,
    createUser,
    getPopularMovies,
    getPopularTvShows,
    getTopRatedMovies,
    getTopRatedTvShows,
    getTrendingMovies,
    getTvShowDetails,
    discoverMovies,
    discoverTvShows,
    search,
    getTrailerKey,
    mediaGenres,
    mediaDetails,
    getTvShowsSeasons,
    getLogos
};
