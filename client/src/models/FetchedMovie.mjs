class FetchedMovie {
    constructor(jsonMovie, isSeries, seasons, episodes) {
        this.id = jsonMovie.id;
        this.title = isSeries ? jsonMovie.original_name : jsonMovie.original_title;
        this.overview = jsonMovie.overview;
        this.backdrop_path = jsonMovie.backdrop_path;
        this.poster_path = jsonMovie.poster_path;
        this.genres_ids = jsonMovie.genre_ids;
        this.release_date = isSeries ? jsonMovie.first_air_date : jsonMovie.release_date;
        this.vote_average = jsonMovie.vote_average;
        this.isSeries = isSeries;
        this.seasons = seasons;
        this.episodes = episodes;
    }

    getId() {
        return this.id;
    }

    getTitle() {
        return this.title;
    }

    getOverview() {
        return this.overview;
    }

    getBackdropPath() {
        return this.backdrop_path;
    }

    getPosterPath() {
        return this.poster_path;
    }

    getGenresIds() {
        return this.genres_ids;
    }

    getReleaseDate() {
        return this.release_date;
    }

    getVoteAverage() {
        return this.vote_average;
    }

    getMediaType() {
        return this.isSeries ? 'tv' : 'movie';
    }

    getSeasons() {
        return this.seasons;
    }

    getEpisodes() {
        return this.episodes;
    }
}

export default FetchedMovie;