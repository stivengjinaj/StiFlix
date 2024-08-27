class Episode {
    constructor(air_date, episode_number, id, name, overview, runtime, still_path, vote_average) {
        this.air_date = air_date;
        this.episode_number = episode_number;
        this.id = id;
        this.name = name;
        this.overview = overview;
        this.runtime = runtime;
        this.still_path = still_path;
        this.vote_average = vote_average;
    }
}

export default Episode;
