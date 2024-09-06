class FetchedMovie {
    constructor(jsonMovie, isSeries, number_of_seasons, number_of_episodes, seasons=null) {
        this.id = jsonMovie.id;
        this.title = isSeries ? jsonMovie.original_name : jsonMovie.original_title;
        this.name = jsonMovie.name;
        this.overview = jsonMovie.overview;
        this.backdrop_path = jsonMovie.backdrop_path;
        this.poster_path = jsonMovie.poster_path;
        this.genres_ids = jsonMovie.genres_ids;
        this.release_date = isSeries ? jsonMovie.first_air_date : jsonMovie.release_date;
        this.vote_average = jsonMovie.vote_average;
        this.isSeries = isSeries;
        this.number_of_seasons = number_of_seasons;
        this.number_of_episodes = number_of_episodes;
        this.seasons = seasons;
    }
}

export default FetchedMovie;