import * as API from "../API.js";
import FetchedMovie from "../models/FetchedMovie.mjs";
import {sortByVoteAverage} from "../helper/miscs.js";
import Episode from "../models/Episode.js";
import Season from "../models/Season.js";
import CacheService from "../models/CacheService.js";

const cache = new CacheService();

class FetchedMovieController {

    /**
     * Function used to get the popular movies and tv shows.
     *
     * @returns Array of popular movies and tv shows.
     * */
    async getAllPopular() {
        const cacheKey = 'all_popular';
        const cached = cache.get(cacheKey);
        if (cached) {
            return cached;
        }

        const popularMovies = await this.getPopularMovies();
        const popularTvShows = await this.getPopularTvShows();
        const result = sortByVoteAverage([...popularMovies, ...popularTvShows]);

        cache.set(cacheKey, result);
        return result;
    }

    /**
     * Function used to get all trending movies and tv shows.
     *
     * @returns Array of trending movies and tv shows.
     */
    async getAllTrending() {
        const cacheKey = 'all_trending';
        const cached = cache.get(cacheKey);
        if (cached) {
            return cached;
        }

        const movies = await API.getTrendingMovies();

        // Fetch all TV show details in parallel instead of sequentially
        const results = await Promise.all(
            movies.results.map(async (movie) => {
                if (movie.media_type === "movie" && this.checkMovieData(movie)) {
                    return new FetchedMovie(movie, false, 0, 0);
                }

                if (movie.media_type === "tv" && this.checkTvShowData(movie)) {
                    const details = await API.getTvShowDetails(movie.id);
                    return new FetchedMovie(
                        movie,
                        true,
                        details.number_of_seasons,
                        details.number_of_episodes
                    );
                }
                return null;
            })
        );

        const result = results.filter(Boolean);
        cache.set(cacheKey, result);
        return result;
    }

    /**
     * Function used to get popular movies (only).
     *
     * @returns Array of popular movies.
     * */
    async getPopularMovies() {
        const cacheKey = 'popular_movies';
        const cached = cache.get(cacheKey);
        if (cached) {
            return cached;
        }

        const fetchedMovies = [];
        try {
            const movies = await API.getPopularMovies();
            movies.forEach(movie => {
                const detailsExist = this.checkMovieData(movie);
                detailsExist && fetchedMovies.push(new FetchedMovie(movie, false, 0, 0));
            });
            cache.set(cacheKey, fetchedMovies);
        } catch (error) {
            console.error('Error fetching popular movies:', error);
        }
        return fetchedMovies;
    }

    /**
     * Function used to get popular tv shows (only).
     *
     * @returns Array of popular tv shows.
     * */
    async getPopularTvShows() {
        const cacheKey = 'popular_tvshows';
        const cached = cache.get(cacheKey);
        if (cached) {
            console.log('Cache hit: getPopularTvShows');
            return cached;
        }

        const tvShows = await API.getPopularTvShows();

        const results = await Promise.all(
            tvShows.map(async (tvShow) => {
                if (!this.checkTvShowData(tvShow)) return null;

                const details = await API.getTvShowDetails(tvShow.id);
                return new FetchedMovie(
                    tvShow,
                    true,
                    details.number_of_seasons,
                    details.number_of_episodes
                );
            })
        );

        const result = results.filter(Boolean);
        cache.set(cacheKey, result);
        return result;
    }

    /**
     * Function used to get top-rated movies.
     *
     * @returns Array of top-rated movies.
     * */
    async getTopRatedMovies() {
        const cacheKey = 'top_rated_movies';
        const cached = cache.get(cacheKey);
        if (cached) {
            return cached;
        }

        const fetchedMovies = [];
        try {
            const movies = await API.getTopRatedMovies();
            movies.forEach(movie => {
                const detailsExist = this.checkMovieData(movie);
                detailsExist && fetchedMovies.push(new FetchedMovie(movie, false, 0, 0));
            });
            cache.set(cacheKey, fetchedMovies);
        } catch (error) {
            console.error('Error fetching top-rated movies:', error);
        }
        return fetchedMovies;
    }

    /**
     * Function used to get 3 pages of movies only
     * OPTIMIZED: Fetches all pages in parallel instead of sequentially
     *
     * @returns Array of movies.
     * */
    async discoverMovies() {
        const cacheKey = 'discover_movies';
        const cached = cache.get(cacheKey);
        if (cached) {
            return cached;
        }
        const fetchedMovies = [];

        const pagePromises = [2, 3, 4].map(page => API.discoverMovies(page));
        const allPages = await Promise.all(pagePromises);

        allPages.forEach(movies => {
            movies.forEach(movie => {
                const detailsExist = this.checkMovieData(movie);
                detailsExist && fetchedMovies.push(new FetchedMovie(movie, false, 0, 0));
            });
        });

        cache.set(cacheKey, fetchedMovies);
        return fetchedMovies;
    }

    /**
     * Function used to get 4 pages of tv shows only
     * OPTIMIZED: Fetches all pages in parallel instead of sequentially
     *
     * @return Array of tv shows.
     */
    async discoverTvShows() {
        const cacheKey = 'discover_tvshows';
        const cached = cache.get(cacheKey);
        if (cached) {
            return cached;
        }

        const resultsMap = new Map();

        try {
            const pagePromises = [2, 3, 4, 5].map(page =>
                API.discoverTvShows(page).catch(error => {
                    console.error(`Error fetching TV shows for page ${page}:`, error);
                    return [];
                })
            );

            const allPages = await Promise.all(pagePromises);

            const allTvShows = allPages.flat();
            const tvShowsWithDetails = await Promise.all(
                allTvShows.map(async (tvShow) => {
                    if (!this.checkTvShowData(tvShow)) return null;

                    try {
                        const details = await API.getTvShowDetails(tvShow.id);
                        return new FetchedMovie(
                            tvShow,
                            true,
                            details.number_of_seasons,
                            details.number_of_episodes
                        );
                    } catch (error) {
                        console.error(`Error fetching details for TV show ${tvShow.id}:`, error);
                        return null;
                    }
                })
            );

            tvShowsWithDetails
                .filter(Boolean)
                .forEach(show => {
                    resultsMap.set(show.id, show);
                });

        } catch (error) {
            console.error('Error in discoverTvShows:', error);
        }

        const result = Array.from(resultsMap.values());
        cache.set(cacheKey, result);
        return result;
    }

    /**
     * Function used to get movie details given an id.
     * NOTE: Not cached as this is dynamic based on user interaction
     *
     * @param movieId Id of the media.
     * @param mediaType movie or tv show.
     * @return media details.
     * */
    async getMediaDetails(movieId, mediaType) {
        const cacheKey = `media_details_${mediaType}_${movieId}`;
        const cached = cache.get(cacheKey);
        if (cached) {
            return cached;
        }
        const media = await API.mediaDetails(movieId, mediaType);
        const mediaJson = {
            id: media.id,
            original_name: media.original_name,
            original_title: media.original_title,
            name: media.name,
            overview: media.overview,
            backdrop_path: media.backdrop_path,
            poster_path: media.poster_path,
            genres_ids: media.genres,
            release_date: media.release_date,
            first_air_date: media.first_air_date,
            vote_average: media.vote_average,
        }

        let result;
        if(mediaType === "tv") {
            const tvShowDetails = await API.getTvShowsSeasons(movieId, media.number_of_seasons);
            const seasons = [];
            tvShowDetails.forEach(season => {
                const episodes = [];
                season.episodes.forEach(episode => {
                    const currentEpisode = new Episode(
                        episode.air_date,
                        episode.episode_number,
                        episode.id,
                        episode.name,
                        episode.overview,
                        episode.runtime,
                        episode.still_path,
                        episode.vote_average
                    );
                    episodes.push(currentEpisode);
                });
                seasons.push(new Season(
                    season.id,
                    season.name,
                    season.overview,
                    season.poster_path,
                    season.season_number,
                    season.vote_average,
                    episodes
                ));
            });
            result = new FetchedMovie(mediaJson, true, media.number_of_seasons, media.number_of_episodes, seasons);
        } else {
            result = new FetchedMovie(mediaJson, false, 0, 0);
        }

        cache.set(cacheKey, result);
        return result;
    }

    /**
     * Function used to get the trailer of a movie.
     *
     * @param movieId Id of the movie.
     * @param mediaType movie or tv show.
     * @return youtube link of the trailer.
     * */
    async getTrailer(movieId, mediaType) {
        const cacheKey = `trailer_${mediaType}_${movieId}`;
        const cached = cache.get(cacheKey);
        if (cached) {
            return cached;
        }

        const data = await API.getTrailerKey(movieId, mediaType);
        if (!data?.length) return null;

        const trailer =
            data.find(v => v.name?.toLowerCase().includes("trailer")) ??
            data[0];

        const result = `https://www.youtube.com/embed/${trailer}`;
        cache.set(cacheKey, result);
        return result;
    }

    /**
     * Function used to get genres for a movie or tv show.
     *
     * @param mediaId Id of the media.
     * @param media_type movie or tv show.
     * @return Array of genres.
     * */
    async getMediaGenres(mediaId, media_type) {
        const cacheKey = `genres_${media_type}_${mediaId}`;
        const cached = cache.get(cacheKey);
        if (cached) {
            return cached;
        }

        const details = await API.mediaGenres(mediaId, media_type);
        cache.set(cacheKey, details.genres);
        return details.genres;
    }

    /**
     * Function used to search a movie or tv show.
     * NOTE: Search results are NOT cached as they're dynamic
     *
     * @param query What to search.
     * @return a list of results.
     * */
    async search(query) {
        // Don't cache search results - they're user-specific and dynamic
        const movies = await API.search(query);

        const results = await Promise.all(
            movies.results.map(async (movie) => {
                if (movie.media_type === "movie" && this.checkMovieData(movie)) {
                    return new FetchedMovie(movie, false, 0, 0);
                }

                if (movie.media_type === "tv" && this.checkTvShowData(movie)) {
                    const details = await API.getTvShowDetails(movie.id);
                    return new FetchedMovie(
                        movie,
                        true,
                        details.number_of_seasons,
                        details.number_of_episodes
                    );
                }

                return null;
            })
        );

        return results.filter(Boolean);
    }

    /**
     * Function used to get the logos of a movie title.
     *
     * @param movieId Movie id.
     * @param mediaType Movie or tv show.
     * @return Array of logos.
     */
    async getMovieLogos(movieId, mediaType) {
        const cacheKey = `logos_${mediaType}_${movieId}`;
        const cached = cache.get(cacheKey);
        if (cached) {
            return cached;
        }

        const logos = await API.getLogos(movieId, mediaType);
        const result = logos.images.logos;
        cache.set(cacheKey, result);
        return result;
    }

    /**
     * Function used to check if the details of a movie exist.
     *
     * @param movie movie to check
     * @return {boolean} true if the details exist, false otherwise.
     */
    checkMovieData (movie) {
        return movie.original_title !== undefined ||
            movie.overview !== undefined ||
            movie.backdrop_path !== undefined ||
            movie.poster_path !== undefined ||
            movie.vote_average !== undefined ||
            movie.release_date !== undefined;
    }

    /**
     * Function used to check if the details of a tv show exist.
     *
     * @param tvShow tv show to check
     * @return {boolean} true if the details exist, false otherwise.
     */
    checkTvShowData (tvShow) {
        return tvShow.original_name !== undefined ||
            tvShow.overview !== undefined ||
            tvShow.backdrop_path !== undefined ||
            tvShow.poster_path !== undefined ||
            tvShow.vote_average !== undefined;
    }

    /**
     * Clear all cached data
     * Useful for manual refresh or when user logs out
     */
    clearCache() {
        cache.clear();
        console.log('Cache cleared');
    }
}

export default FetchedMovieController;