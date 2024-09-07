const remote_url = "https://stiflix.vercel.app";

/*const getPopularMovies = async () => {
   const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`, {
        headers: {
            Authorization: `Bearer ${tmdb_read_token}`,
            Accept: "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}*/

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

/*const getPopularTvShows = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc`, {
        headers: {
            Authorization: `Bearer ${tmdb_read_token}`,
            Accept: "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}*/
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

/*const getTopRatedMovies = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`, {
        headers: {
            Authorization: `Bearer ${tmdb_read_token}`,
            Accept: "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}*/
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

/*const getTopRatedTvShows = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=1&sort_by=vote_average.desc&vote_count.gte=200`, {
        headers: {
            Authorization: `Bearer ${tmdb_read_token}`,
            Accept: "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}*/
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

/*const getTrendingMovies = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?language=en-US`, {
        headers: {
            Authorization: `Bearer ${tmdb_read_token}`,
            Accept: "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}*/
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

/*const getTvShowDetails = async (tvShowId) => {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${tvShowId}?language=en-US`, {
        headers: {
            Authorization: `Bearer ${tmdb_read_token}`,
            Accept: "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
} */
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

/*const discoverMovies = async (page) => {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`, {
        headers: {
            Authorization: `Bearer ${tmdb_read_token}`,
            Accept: "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}*/
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

/*const discoverTvShows = async (page) => {
    const response = await fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc`, {
        headers: {
            Authorization: `Bearer ${tmdb_read_token}`,
            Accept: "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}*/
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

/*const mediaDetails = async (id, mediaType) => {
    const baseUrl = mediaType === 'movie' ? 'https://api.themoviedb.org/3/movie/' : 'https://api.themoviedb.org/3/tv/';
    const response = await fetch(`${baseUrl}${id}?language=en-US`, {
        headers: {
            Authorization: `Bearer ${tmdb_read_token}`,
            Accept: "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
};*/
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
/*const getTvShowsSeasons = async (id, seasons) => {
    const allSeasons = [];
    for (let i = 1; i <= seasons; i++) {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/season/${i}?language=en-US`, {
            headers: {
                Authorization: `Bearer ${tmdb_read_token}`,
                Accept: "application/json"
            }
        });
        const seasonData = await response.json();
        allSeasons.push(seasonData);
    }
    return allSeasons;
}*/
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

/*const mediaGenres = async (id, media_type) => {
    let response;
    if (media_type === "tv") {
        response = await fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, {
            headers: {
                Authorization: `Bearer ${tmdb_read_token}`,
                Accept: "application/json"
            }
        });
    } else {
        response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
            headers: {
                Authorization: `Bearer ${tmdb_read_token}`,
                Accept: "application/json"
            }
        });
    }
    return await response.json();
}*/
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

/*const getTrailerKey = async (movieId, mediaType) => {
    const baseUrl = mediaType === 'movie' ? 'https://api.themoviedb.org/3/movie/' : 'https://api.themoviedb.org/3/tv/';
    const response = await fetch(`${baseUrl}${movieId}/videos?language=en-US`, {
        headers: {
            Authorization: `Bearer ${tmdb_read_token}`,
            Accept: "application/json"
        }
    });
    return await response.json();
}*/
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

/*const search = async (query) => {
    const response = await fetch(`https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&page=1&query=${query}`, {
        headers: {
            Authorization: `Bearer ${tmdb_read_token}`,
            Accept: "application/json"
        }
    });
    return await response.json();
}*/
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

/**
 * API used to get movie ID from Piracy server. NOT WORKING
 *
 * @param query search query for the movie to search.
 * @param type movie type.
 * @param year release year.
 * @return json with movie data or an error message.
 */
const getMovieId = async (query, type, year) => {
    const response = await fetch(`${remote_url}/api/movieId?query=${query}&type=${type}&year=${year}`, {
        headers: {
            Accept: "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch movie`);
    }

    return await response.json();
};

/**
 * API used to get a link from a specific server.
 *
 * @param movieId id of the movie.
 * @param server server where to look.
 * @return json with data.
 * */
const getMovieSources = async (movieId, server) => {
    const response = await fetch(`${remote_url}/api/getMovieSources?movieId=${movieId}&server=${server}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch movie sources`);
    }

    return await response.json();
};
/**
 * API used to get the id of the movie that Braflix uses to search the movies. A.K.A
 * TMDB to Braflix id converter.
 *
 * @param server server where to Braflix takes the movie.
 * @param query search query.
 * @param year release year.
 * @param type media type.
 * @param episode episode index if tv show, otherwise default value is 1.
 * @param season season index if tv show, otherwise default value is 1.
 * @param movieId id of the movie.
 * @return braflix movie id.
 * */
const getMovieIdBraflix = async (server, query, year, type, episode, season, movieId) => {
    const response = await fetch(`${remote_url}/api/getMovieIdBraflix?server=${server}&query=${encodeURIComponent(query)}&year=${year}&type=${type}&episode=${episode}&season=${season}&movieId=${movieId}`);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data.id;
};


export {
    getPopularMovies,
    getPopularTvShows,
    getTopRatedMovies,
    getTopRatedTvShows,
    getTrendingMovies,
    getTvShowDetails,
    discoverMovies,
    discoverTvShows,
    getMovieId,
    getMovieSources,
    getMovieIdBraflix,
    search,
    getTrailerKey,
    mediaGenres,
    mediaDetails,
    getTvShowsSeasons,
    getLogos
};
