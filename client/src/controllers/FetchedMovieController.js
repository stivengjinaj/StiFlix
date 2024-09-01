import * as API from "../API.js";
import FetchedMovie from "../models/FetchedMovie.mjs";
import {sortByVoteAverage} from "../helper/miscs.js";
import Episode from "../models/Episode.js";
import Season from "../models/Season.js";

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
            const detailsExist = movie.media_type === "movie" ? this.checkMovieData(movie) : this.checkTvShowData(movie);
            if(detailsExist) {
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
        try {
            const movies = await API.getPopularMovies();
            movies.results.forEach(movie => {
                const detailsExist = this.checkMovieData(movie);
                detailsExist && fetchedMovies.push(new FetchedMovie(movie, false, 0, 0));
            });
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
        const fetchedMovies = [];
        try {
            const tvShows = await API.getPopularTvShows();
            tvShows.results.forEach(tvShow => {
                const detailsExist = this.checkTvShowData(tvShow);
                if (detailsExist) {
                    API.getTvShowDetails(tvShow.id)
                        .then(tvShowDetails => {
                            fetchedMovies.push(
                                new FetchedMovie(
                                    tvShow,
                                    true,
                                    tvShowDetails.number_of_seasons,
                                    tvShowDetails.number_of_episodes
                                )
                            );
                        });
                }
            });
        } catch (error) {
            console.error('Error fetching popular TV shows:', error);
        }
        return fetchedMovies;
    }

    /**
     * Function used to get top-rated movies.
     *
     * @returns Array of top-rated movies.
     * */
    async getTopRatedMovies() {
        const fetchedMovies = [];
        try {
            const movies = await API.getTopRatedMovies();
            movies.results.forEach(movie => {
                const detailsExist = this.checkMovieData(movie);
                detailsExist && fetchedMovies.push(new FetchedMovie(movie, false, 0, 0));
            });
        } catch (error) {
            console.error('Error fetching top-rated movies:', error);
        }
        return fetchedMovies;
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
                console.log(tvShows.results);
                API.getTvShowDetails(tvShow.id)
                    .then(tvShowDetails => {
                        const detailsExist = this.checkTvShowData(tvShow);
                        console.log(detailsExist);
                        detailsExist && fetchedMovies.push(
                            new FetchedMovie(
                                tvShow,
                                true,
                                tvShowDetails.number_of_seasons,
                                tvShowDetails.number_of_episodes
                            )
                        );
                    });
        });
        return fetchedMovies;
    }

    /**
     * Function used to get 3 pages of movies only
     *
     * @returns Array of movies.
     * */
    async discoverMovies() {
        const fetchedMovies = []
        for (let i = 2; i < 5; i++) {
            const movies = await API.discoverMovies(i);
            movies.results.forEach(movie => {
                const detailsExist = this.checkMovieData(movie);
                detailsExist && fetchedMovies.push(new FetchedMovie(movie, false, 0, 0));
            });
        }
        return fetchedMovies;
    }

    /**
     * Function used to get 4 pages of tv shows only
     *
     * @return Array of tv shows.
     */
    async discoverTvShows() {
        const fetchedMovies = [];
        for (let i = 2; i < 6; i++) {
            try {
                const tvShows = await API.discoverTvShows(i);
                tvShows.results.forEach(tvShow => {
                    const detailsExist = this.checkTvShowData(tvShow);
                    if (detailsExist) {
                        API.getTvShowDetails(tvShow.id)
                            .then(tvShowDetails => {
                                fetchedMovies.push(
                                    new FetchedMovie(
                                        tvShow,
                                        true,
                                        tvShowDetails.number_of_seasons,
                                        tvShowDetails.number_of_episodes
                                    )
                                );
                            });
                    }
                });
            } catch (error) {
                console.error(`Error fetching TV shows for page ${i}:`, error);
            }
        }
        return fetchedMovies;
    }

    /**
     * Function used to get movie details given an id.
     *
     * @param movieId Id of the media.
     * @param mediaType movie or tv show.
     * @return media details.
     * */
    async getMediaDetails(movieId, mediaType) {
        const media = await API.mediaDetails(movieId, mediaType);
        const mediaJson = {
            id: media.id,
            original_name: media.original_name,
            original_title: media.original_title,
            overview: media.overview,
            backdrop_path: media.backdrop_path,
            poster_path: media.poster_path,
            genres_ids: media.genres,
            release_date: media.release_date,
            first_air_date: media.first_air_date,
            vote_average: media.vote_average,
        }
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
            return new FetchedMovie(mediaJson, true, media.number_of_seasons, media.number_of_episodes, seasons);
        }else {
            return new FetchedMovie(mediaJson, false, 0, 0)
        }
    }

    /**
     * Function used to get the trailer of a movie.
     *
     * @param movieId Id of the movie.
     * @param mediaType movie or tv show.
     * @return youtube link of the trailer.
     * */
    async getTrailer(movieId, mediaType) {
        const videoResults = await API.getTrailerKey(movieId, mediaType);
        const youtubeLink = "https://www.youtube.com/embed/";

        if(videoResults.results){
            if (videoResults.results.length > 0) {
                const trailerVideo = videoResults.results.find(video =>
                    video.name.toLowerCase().includes("trailer")
                );

                return youtubeLink + (trailerVideo ? trailerVideo.key : videoResults.results[0].key);
            }
        }
        return null;
    }


    /**
     * Function used to get genres for a movie or tv show.
     *
     * @param mediaId Id of the media.
     * @param media_type movie or tv show.
     * @return Array of genres.
     * */
    async getMediaGenres(mediaId, media_type) {
        const details = await API.mediaGenres(mediaId, media_type);
        return details.genres;
    }

    /**
     * Function used to search a movie or tv show.
     *
     * @param query What to search.
     * @return a list of results.
     * */
    async search(query) {
        const fetchedMovies = [];
        const movies = await API.search(query);
        movies.results.forEach(movie => {
            const detailsExist = movie.media_type === "movie" ? this.checkMovieData(movie) : this.checkTvShowData(movie);
            if(detailsExist) {
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
            }
        });
        return fetchedMovies;
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
}

export default FetchedMovieController;