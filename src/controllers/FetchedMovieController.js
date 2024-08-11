import * as API from "../API.js";
import FetchedMovie from "../models/FetchedMovie.mjs";
import {sortByVoteAverage} from "../helper/miscs.js";

class FetchedMovieController {

    /**
     * Function used to get the popular movies and tv shows.
     *
     * @returns Array of popular movies and tv shows.
     * */
    async getAllPopular() {
        const popularMovies = await this.getPopularMovies();
        const popularTvShows = await this.getPopularTvShows();
        return sortByVoteAverage([...popularMovies, ...popularTvShows]);
    }

    /**
     * Function used to get all trending movies and tv shows.
     *
     * @returns Array of trending movies and tv shows.
     */
    async getAllTrending() {
        const fetchedMovies = [];
        const movies = await API.getTrendingMovies();
        movies.results.forEach(movie => {
            if(movie.media_type === "movie") {
                fetchedMovies.push(new FetchedMovie(movie, false, 0, 0));
            }else {
                const tvShowDetails = API.getTvShowDetails(movie.id);
                fetchedMovies.push(
                    new FetchedMovie(
                        movie,
                        true,
                        tvShowDetails.number_of_seasons,
                        tvShowDetails.number_of_episodes
                    )
                );
            }
        });
        return fetchedMovies;
    }

    /**
     * Function used to get popular movies (only).
     *
     * @returns Array of popular movies.
     * */
    async getPopularMovies() {
        const fetchedMovies = [];
        const movies = await API.getPopularMovies();
        movies.results.forEach(movie => fetchedMovies.push(new FetchedMovie(movie, false, 0, 0)));
        return fetchedMovies;
    }

    /**
     * Function used to get popular tv shows (only).
     *
     * @returns Array of popular tv shows.
     * */
    async getPopularTvShows() {
        const fetchedMovies = [];
        const tvShows = await API.getPopularTvShows();
        tvShows.results.forEach(tvShow => {
            const tvShowDetails = API.getTvShowDetails(tvShow.id)
            fetchedMovies.push(
                new FetchedMovie(
                    tvShow,
                    true,
                    tvShowDetails.number_of_seasons,
                    tvShowDetails.number_of_episodes
                )
            )
        });
        return fetchedMovies;
    }

    /**
     * Function used to get top-rated movies.
     *
     * @returns Array of top-rated movies.
     * */
    async getTopRatedMovies() {
        const fetchedMovies = []
        API.getTopRatedMovies()
            .then((movies) => {
                movies.results.map((movie) => {
                    const fetchedMovie = new FetchedMovie(movie, false, 0, 0);
                    fetchedMovies.push(fetchedMovie);
                });
                return fetchedMovies;
            });
    }

    /**
     * Function used to get top-rated tv shows.
     *
     * @returns Array of top-rated tv shows.
     * */
    async getTopRatedTvShows() {
        const fetchedMovies = [];
        const tvShows = await API.getTopRatedTvShows();
        tvShows.results.forEach(tvShow => {
            const tvShowDetails = API.getTvShowDetails(tvShow.id);
            fetchedMovies.push(
                new FetchedMovie(
                    tvShow,
                    true,
                    tvShowDetails.number_of_seasons,
                    tvShowDetails.number_of_episodes
                )
            );
        });
        return fetchedMovies;
    }
}

export default FetchedMovieController;