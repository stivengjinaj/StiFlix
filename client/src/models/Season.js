class Season {
    constructor(id, name, overview, poster_path, season_number, vote_average, episodes) {
        this.id = id;
        this.name = name;
        this.overview = overview;
        this.poster_path = poster_path;
        this.season_number = season_number;
        this.vote_average = vote_average;
        this.episodes = episodes;
    }
}

export default Season;