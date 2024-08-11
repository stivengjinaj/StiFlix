
//1) Get latest, tendency, popular, and top-rated movies

//2) Get movie covers/ posters

//3) Movie searching

const tmdb_api_key = "9301ddc7c3bf38fbdf333ae15a936792"

const tmdb_read_token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MzAxZGRjN2MzYmYzOGZiZGYzMzNhZTE1YTkzNjc5MiIsIm5iZiI6MTcyMzM5NTY2NS40NTcyMDIsInN1YiI6IjY2YjhlZDY0ZmUyNGZlODUwNGY2ZWZjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b8zxhQus7eZTVich0Jv9lMp3vXM2v-LQXPLLKB9cmaM"

const piracy_servers = ["f2cloud", "megacloud", "https://rabbitstream.net/v2/embed-4/idToBeScraped?_debug=true"]

//VIDCLOUD BRAFLIX
const braflix_vidcloud = "https://api.braflix.ru/vidcloud/sources-with-title?title=movie_title&mediaType=movie&episodeId=1&seasonId=1&tmdbId=movieID\t"

//MEGACLOUD BRAFLIX
const braflix_megacloud = "https://api.braflix.ru/megacloud/sources-with-title?title=movie_title&mediaType=movie&episodeId=1&seasonId=1&tmdbId=movieID\t"

/**
 * API used to get popular movies(only).
 *
 * @returns JSON object of popular movies.
 * */
const getPopularMovies = async () => {
   const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`, {
        headers: {
            Authorization: `Bearer ${tmdb_read_token}`,
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
    const response = await fetch(`https://api.themoviedb.org/3/tv/popular?language=en-US&page=1`, {
        headers: {
            Authorization: `Bearer ${tmdb_read_token}`,
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
    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`, {
        headers: {
            Authorization: `Bearer ${tmdb_read_token}`,
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
    const response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1`, {
        headers: {
            Authorization: `Bearer ${tmdb_read_token}`,
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
    const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?language=en-US`, {
        headers: {
            Authorization: `Bearer ${tmdb_read_token}`,
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
    const response = await fetch(`https://api.themoviedb.org/3/tv/${tvShowId}?language=en-US`, {
        headers: {
            Authorization: `Bearer ${tmdb_read_token}`,
            Accept: "application/json"
        }
    });
    return await response.json();
}

export {getPopularMovies, getTopRatedMovies, getPopularTvShows, getTopRatedTvShows, getTrendingMovies, getTvShowDetails}
