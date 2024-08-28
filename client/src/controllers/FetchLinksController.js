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
        const handleError = (server, error) => links.push({ server, link: null, error });

        try {
            const movieIdResponse = await API.getMovieId(query, type, year);

            const promises = [
                API.getMovieIdBraflix("upcloud", query, year, type, 1, 1, movieId)
                    .then(response => links.push({ server: "Alpha", link: `https://rabbitstream.net/v2/embed-4/${response}?_debug=true`, error: null }))
                    .catch(error => links.push({ server: "upcloud", link: null, error })),

                API.getMovieIdBraflix("vidcloud", query, year, type, 1, 1, movieId)
                    .then(response => links.push({ server: "Beta", link: `https://rabbitstream.net/v2/embed-4/${response}?_debug=true`, error: null }))
                    .catch(error => links.push({ server: "vidcloud", link: null, error })),

                API.getMovieIdBraflix("megacloud", query, year, type, 1, 1, movieId)
                    .then(response => links.push({ server: "Gamma", link: `https://megacloud.tv/embed-1/e-1/${response}?_debug=true`, error: null }))
                    .catch(error => links.push({ server: "megacloud", link: null, error }))
            ];

            if (movieIdResponse[0]?.id) {
                const piracyId = movieIdResponse[0].id;

                promises.push(
                    API.getMovieSources(piracyId, "f2cloud")
                        .then(response => links.push({ server: "Delta", link: response, error: null }))
                        .catch(error => links.push({ server: "f2cloud", link: null, error })),

                    API.getMovieSources(piracyId, "megacloud")
                        .then(response => links.push({ server: "Epsilon", link: response, error: null }))
                        .catch(error => links.push({ server: "megacloud", link: null, error }))
                );
            }
            await Promise.all(promises);
        } catch (error) {
            handleError("All", error);
        }
        return links;
    }



    /**
     * Function that fetches links from a specific server.
     *
     * @param query Search query of the movie.
     * @param type Media type: movie or tv show.
     * @param year release year.
     * @param movieId movie id.
     * @param server server to fetch links from.
     * @return array of links.
     * */
    async fetchFromServer(query, type, year, movieId, server) {
        const links = [];
        const handleResponse = (server, link) => links.push({ server, link, error: null });
        const handleError = (server, error) => links.push({ server, link: null, error });

        try {
            switch (server) {
                case "Alpha":
                    await API.getMovieIdBraflix("upcloud", query, year, type, 1, 1, movieId)
                        .then(response => handleResponse("Alpha", `https://rabbitstream.net/v2/embed-4/${response}?_debug=true`))
                        .catch(error => handleError("Alpha", error));
                    break;
                case "Beta":
                    await API.getMovieIdBraflix("vidcloud", query, year, type, 1, 1, movieId)
                        .then(response => handleResponse("Beta", `https://rabbitstream.net/v2/embed-4/${response}?_debug=true`))
                        .catch(error => handleError("Beta", error));
                    break;
                case "Gamma":
                    await API.getMovieIdBraflix("megacloud", query, year, type, 1, 1, movieId)
                        .then(response => handleResponse("Gamma", `https://megacloud.tv/embed-1/e-1/${response}?_debug=true`))
                        .catch(error => handleError("Gamma", error));
                    break;
                case "Delta":
                    await API.getMovieSources(movieId, "f2cloud")
                        .then(response => handleResponse("Delta", response))
                        .catch(error => handleError("Delta", error));
                    break;
                case "Epsilon":
                    await API.getMovieSources(movieId, "megacloud")
                        .then(response => handleResponse("Epsilon", response))
                        .catch(error => handleError("Epsilon", error));
                    break;
            }
        } catch (e) {
            handleError(server, e);
        }
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
        const handleResponse = (server, link) => links.push({ server, link, error: null });
        const handleError = (server, error) => links.push({ server, link: null, error });

        const promises = [
            API.getMovieIdBraflix("upcloud", query, year, type, episode, season, movieId)
                .then(response => handleResponse("Alpha", `https://rabbitstream.net/v2/embed-4/${response}?_debug=true`))
                .catch(error => handleError("Alpha", error)),

            API.getMovieIdBraflix("vidcloud", query, year, type, episode, season, movieId)
                .then(response => handleResponse("Beta", `https://rabbitstream.net/v2/embed-4/${response}?_debug=true`))
                .catch(error => handleError("Beta", error)),

            API.getMovieIdBraflix("megacloud", query, year, type, episode, season, movieId)
                .then(response => handleResponse("Gamma", `https://megacloud.tv/embed-1/e-1/${response}?_debug=true`))
                .catch(error => handleError("Gamma", error))
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
        const handleResponse = (server, link) => links.push({ server, link, error: null });
        const handleError = (server, error) => links.push({ server, link: null, error });

        const promises = [
            API.getMovieIdBraflix("upcloud", query, year, type, 1, 1, movieId)
                .then(response => handleResponse("Alpha", `https://rabbitstream.net/v2/embed-4/${response}?_debug=true`))
                .catch(error => handleError("Alpha", error)),

            API.getMovieIdBraflix("vidcloud", query, year, type, 1, 1, movieId)
                .then(response => handleResponse("Beta", `https://rabbitstream.net/v2/embed-4/${response}?_debug=true`))
                .catch(error => handleError("Beta", error)),

            API.getMovieIdBraflix("megacloud", query, year, type, 1, 1, movieId)
                .then(response => handleResponse("Gamma", `https://megacloud.tv/embed-1/e-1/${response}?_debug=true`))
                .catch(error => handleError("Gamma", error))
        ];

        await Promise.all(promises);

        return links;
    }

}

export default FetchLinksController;
