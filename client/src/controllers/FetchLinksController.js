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
    async fetchLinks(query, type, year, movieId) {
        const links = [];

        const movieIdResponse = await API.getMovieId(query, type, year);
        const id = movieIdResponse[0].id;

        const promises = [
            API.getMovieSources(id, "f2cloud").then(response => links.push(response)),
            API.getMovieSources(id, "megacloud").then(response => links.push(response)),
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
