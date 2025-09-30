import {remote_url} from "../API.js";

class FetchLinksController {

    /**
     * Function used to get the links where to watch a movie.
     *
     * @param mediaType movie or tv show.
     * @param id id of the media.
     * @param season season of the tv show (default 1).
     * @param episode episode of the tv show (default 1).
     * @return array of links.
     * */
    fetchAllLinks(mediaType, id, season=1, episode=1) {
        const links = [];
        if (mediaType === "movie") {
            links.push({link: `https://vidlink.pro/movie/${id}?primaryColor=63b8bc&secondaryColor=a2a2a2&iconColor=eefdec&icons=default&player=jw&title=true&poster=true&autoplay=true&nextbutton=true`, server: "Alpha"})
            links.push({link: `https://player.smashy.stream/movie/${id}`, server: "Beta"})
            links.push({link: `https://embed.su/embed/movie/${id}`, server: "Gamma"})
            links.push({links: `${remote_url}/?url=https://vidlink.pro/movie/${id}`, server: "Delta"})
        }else if (mediaType === "tv") {
            links.push({link: `https://vidlink.pro/tv/${id}/${season}/${episode}?primaryColor=63b8bc&secondaryColor=a2a2a2&iconColor=eefdec&icons=default&player=jw&title=true&poster=true&autoplay=true&nextbutton=true`, server: "Alpha"})
            links.push({link: `https://player.smashy.stream/tv/${id}?s=${season}&e=${episode}`, server: "Beta"})
            links.push({link: `https://embed.su/embed/tv/${id}/${season}/${episode}`, server: "Gamma"})
            links.push({links: `${remote_url}/?url=https://vidlink.pro/tv/${id}/${season}/${episode}`, server: "Delta"})
        }

        return links;
    }

    // Made a class in case I need to add more functionality later.
}

export default FetchLinksController;
