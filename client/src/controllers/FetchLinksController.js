import * as API from "../API.js";

class FetchLinksController {

    /**
     * Function used to get the links where to watch a movie.
     *
     * @param query Search query of the movie.
     * @param type Media type: movie or tv show.
     * @param year release year.
     * @param movieId movie id.
     * @return array of links.
     * */
    async fetchAllLinks(query, type, year, movieId) {
        const links = [];

        const movieIdResponse = await API.getMovieId(query, type, year);
        const piracyId = movieIdResponse[0].id;

        const promises = [
            API.getMovieSources(piracyId, "f2cloud").then(response => links.push(response)),
            API.getMovieSources(piracyId, "megacloud").then(response => links.push(response)),
            API.getMovieIdBraflix("upcloud", query, year, type, 1, 1, movieId)
                .then(response => links.push(`https://rabbitstream.net/v2/embed-4/${response}?_debug=true`)),
            API.getMovieIdBraflix("vidcloud", query, year, type, 1, 1, movieId)
                .then(response => links.push(`https://rabbitstream.net/v2/embed-4/${response}?_debug=true`)),
            API.getMovieIdBraflix("megacloud", query, year, type, 1, 1, movieId)
                .then(response => links.push(`https://megacloud.tv/embed-1/e-1/${response}?_debug=true`))
        ];

        await Promise.all(promises);

        return links;
    }

    /**
     * Function used to get links specific to season and episode of a tv show.
     *
     * @param query Search query of the movie.
     * @param type Media type: movie or tv show.
     * @param year release year.
     * @param movieId movie id.
     * @param season season index.
     * @param episode episode index.
     * @return array of links.
     * */
    async fetchTvShowSpecific(query, type, year, movieId, season, episode) {
        const links = [];

        const promises = [
            API.getMovieIdBraflix("upcloud", query, year, type, episode, season, movieId)
                .then(response => links.push(`https://rabbitstream.net/v2/embed-4/${response}?_debug=true`)),
            API.getMovieIdBraflix("vidcloud", query, year, type, episode, season, movieId)
                .then(response => links.push(`https://rabbitstream.net/v2/embed-4/${response}?_debug=true`)),
            API.getMovieIdBraflix("megacloud", query, year, type, episode, season, movieId)
                .then(response => links.push(`https://megacloud.tv/embed-1/e-1/${response}?_debug=true`))
        ];

        await Promise.all(promises);

        return links;
    }

    /**
     * Function used to get links that it is not possible to get from the piracy server.
     *
     * @param query Search query of the movie.
     * @param type Media type: movie or tv show.
     * @param year release year.
     * @param movieId movie id.
     * @return array of links.
     * */
    async fetchSpecialLinks(query, type, year, movieId) {
        const links = [];

        const promises = [
            API.getMovieIdBraflix("upcloud", query, year, type, 1, 1, movieId)
                .then(response => links.push(`https://rabbitstream.net/v2/embed-4/${response}?_debug=true`)),
            API.getMovieIdBraflix("vidcloud", query, year, type, 1, 1, movieId)
                .then(response => links.push(`https://rabbitstream.net/v2/embed-4/${response}?_debug=true`)),
            API.getMovieIdBraflix("megacloud", query, year, type, 1, 1, movieId)
                .then(response => links.push(`https://megacloud.tv/embed-1/e-1/${response}?_debug=true`))
        ];

        await Promise.all(promises);

        return links;
    }
}

export default FetchLinksController;
