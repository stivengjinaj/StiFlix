import express from 'express';
import cors from 'cors';
import {createProxyMiddleware, responseInterceptor} from 'http-proxy-middleware';

const app = express();

const tmdb_api_key = "9301ddc7c3bf38fbdf333ae15a936792"
const tmdb_read_token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MzAxZGRjN2MzYmYzOGZiZGYzMzNhZTE1YTkzNjc5MiIsIm5iZiI6MTcyMzM5NTY2NS40NTcyMDIsInN1YiI6IjY2YjhlZDY0ZmUyNGZlODUwNGY2ZWZjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.b8zxhQus7eZTVich0Jv9lMp3vXM2v-LQXPLLKB9cmaM"


/*const corsOptions = {
    origin: '*',
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};*/

app.use(cors());

/**
 * Cross proxy used to get popular movies from TMDB API.
 * */
app.get('/api/popularMovies', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${tmdb_api_key}`, {
        headers: {
            Authorization: `Bearer ${tmdb_read_token}`,
            Accept: "application/json"
        }
    });

    if (!response.ok) {
        return res.status(500).json({ error: 'Failed to fetch data' });
    }
    res.json(await response.json());
});

/**
 * Cross proxy used to get popular tv shows from TMDB API.
 */
app.get('/api/popularTvShows', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    const response = await fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${tmdb_api_key}`, {
        headers: {
            Authorization: `Bearer ${tmdb_read_token}`,
            Accept: "application/json"
        }
    });

    if (!response.ok) {
        return res.status(500).json({ error: 'Failed to fetch data' });
    }

    res.json(await response.json());
});

/**
 * Cross proxy used to get top rated movies from TMDB API.
 */
app.get('/api/topRatedMovies', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${tmdb_api_key}`, {
        headers: {
            Authorization: `Bearer ${tmdb_read_token}`,
            Accept: "application/json"
        }
    });

    if (!response.ok) {
        return res.status(500).json({ error: 'Failed to fetch data' });
    }

    res.json(await response.json());
});

/**
 * Cross proxy used to get top rated tv shows from TMDB API.
 */
app.get('/api/topRatedTvShows', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    const response = await fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=1&sort_by=vote_average.desc&vote_count.gte=200&api_key=${tmdb_api_key}`, {
        headers: {
            Authorization: `Bearer ${tmdb_read_token}`,
            Accept: "application/json"
        }
    });

    if (!response.ok) {
        return res.status(500).json({ error: 'Failed to fetch data' });
    }

    res.json(await response.json());
});

/**
 * Cross proxy used to get trending movies from TMDB API.
 */
app.get('/api/trendingMovies', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${tmdb_api_key}`, {
        headers: {
            Authorization: `Bearer ${tmdb_read_token}`,
            Accept: "application/json"
        }
    });

    if (!response.ok) {
        return res.status(500).json({ error: 'Failed to fetch data' });
    }

    res.json(await response.json());
});

/**
 * Cross proxy used to get tv show details from TMDB API.
 */
app.get('/api/tvShowDetails', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    const response = await fetch(`https://api.themoviedb.org/3/tv/${req.query.id}?language=en-US&api_key=${tmdb_api_key}`, {
        headers: {
            Authorization: `Bearer ${tmdb_read_token}`,
            Accept: "application/json"
        }
    });

    if (!response.ok) {
        return res.status(500).json({ error: 'Failed to fetch data' });
    }

    res.json(await response.json());
});

/**
 * Cross proxy used to get movies from TMDB API.
 */
app.get('/api/discoverMovies', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${req.query.page}&sort_by=popularity.desc`, {
        headers: {
            Authorization: `Bearer ${tmdb_read_token}`,
            Accept: "application/json"
        }
    });

    if (!response.ok) {
        return res.status(500).json({ error: 'Failed to fetch data' });
    }

    res.json(await response.json());
});

/**
 * Cross proxy used to get tv shows from TMDB API.
 */
app.get('/api/discoverTvShows', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    const response = await fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${req.query.page}&sort_by=popularity.desc`, {
        headers: {
            Authorization: `Bearer ${tmdb_read_token}`,
            Accept: "application/json"
        }
    });

    if (!response.ok) {
        return res.status(500).json({ error: 'Failed to fetch data' });
    }

    res.json(await response.json());
});

/**
 * Cross proxy used to get movie details from TMDB API.
 */
app.get('/api/mediaDetails', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    const mediaType = req.query.mediaType;
    const id = req.query.id;
    const baseUrl = mediaType === 'movie' ? 'https://api.themoviedb.org/3/movie/' : 'https://api.themoviedb.org/3/tv/';
    const response = await fetch(`${baseUrl}${id}?language=en-US&api_key=${tmdb_api_key}`, {
        headers: {
            Authorization: `Bearer ${tmdb_read_token}`,
            Accept: "application/json"
        }
    });

    if (!response.ok) {
        return res.status(500).json({ error: 'Failed to fetch data' });
    }

    res.json(await response.json());
});

/**
 * Cross proxy used to get tv show seasons from TMDB API.
 */
app.get('/api/tvShowsSeasons', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    const id = req.query.id;
    const season = req.query.season;

    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/season/${season}?language=en-US&api_key=${tmdb_api_key}`, {
        headers: {
            Authorization: `Bearer ${tmdb_read_token}`,
            Accept: "application/json"
        }
    });

    if (!response.ok) {
        return res.status(500).json({ error: 'Failed to fetch data' });
    }

    res.json(await response.json());
});

/**
 * Cross proxy used to get movie genres from TMDB API.
 */
app.get('/api/mediaGenres', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    let response;
   const mediaType = req.query.mediaType;
   const id = req.query.id;

    if (mediaType === 'movie') {
        response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${tmdb_api_key}`, {
            headers: {
                Authorization: `Bearer ${tmdb_read_token}`,
                Accept: "application/json"
            }
        });
    } else {
        response = await fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US&api_key=${tmdb_api_key}`, {
            headers: {
                Authorization: `Bearer ${tmdb_read_token}`,
                Accept: "application/json"
            }
        });
    }

    if (!response.ok) {
        return res.status(500).json({ error: 'Failed to fetch data' });
    }

    res.json(await response.json());
});

/**
 * Cross proxy used to get movie trailers from TMDB API.
 */
app.get('/api/trailerKey', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    const mediaType = req.query.mediaType;
    const id = req.query.id;
    const baseUrl = mediaType === 'movie' ? 'https://api.themoviedb.org/3/movie/' : 'https://api.themoviedb.org/3/tv/';
    const response = await fetch(`${baseUrl}${id}/videos?language=en-US&api_key=${tmdb_api_key}`, {
        headers: {
            Authorization: `Bearer ${tmdb_read_token}`,
            Accept: "application/json"
        }
    });

    if (!response.ok) {
        return res.status(500).json({ error: 'Failed to fetch data' });
    }

    res.json(await response.json());
});

/**
 * Cross proxy used to search movies from TMDB API.
 */
app.get('/api/search', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    const query = req.query.query;
    const response = await fetch(`https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&page=1&query=${query}&api_key=${tmdb_api_key}`, {
        headers: {
            Authorization: `Bearer ${tmdb_read_token}`,
            Accept: "application/json"
        }
    });

    if (!response.ok) {
        return res.status(500).json({ error: 'Failed to fetch data' });
    }

    res.json(await response.json());
});

/**
 * Cross proxy used to get movie logos from TMDB API.
 *
 */
app.get('/api/movieLogos', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    const { movieId, mediaType } = req.query;
    const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${movieId}?language=en-US&append_to_response=images&include_image_language=en`, {
        headers: {
            Authorization: `Bearer ${tmdb_read_token}`,
            Accept: "application/json"
        }
    });

    if (!response.ok) {
        return res.status(500).json({ error: 'Failed to fetch data' });
    }

    res.json(await response.json());
});


//----------------------MOVIES AND TV SHOWS LINKS----------------------//

/**
 *  Cross proxy used to get movie id from Piracy server. (NOT WORKING)
 * */
app.get('/api/movieId', async (req, res) => {
    const { query, type, year } = req.query;
    const response = await fetch(`https://vsrc.piracy.su/search?query=${query}&type=${type}&year=${year}`, {
        headers: {
            Accept: "application/json",
            UserAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_4_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5.2 Safari/605.1.15"
        }
    });
    const data = await response.json();

    if (data.error) {
        return res.status(500).json({ error: "Failed to fetch data" });
    }

    res.json(data);
});

/**
 *  Cross proxy used to get movie links from Piracy servers. (NOT WORKING)
 * */
app.get('/api/getMovieSources', async (req, res) => {
    const { movieId, server } = req.query;
    const response = await fetch(`https://vsrc.piracy.su/movie?id=${movieId}&server=${server}`, {
        headers: {
            Accept: "application/json",
            UserAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_4_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5.2 Safari/605.1.15"
        }
    });
    const data = await response.json();
    res.json(data);
});

/**
 *  Cross proxy used to get movie id from Braflix server. (without proxy middleware)
 * */
/*app.get('/api/getMovieIdBraflix', async (req, res) => {
    const { server, query, year, type, episode, season, movieId } = req.query;
    //const encodedQuery = encodeURIComponent(query).replace(/%20/g, '+');
    try {
        const response = await fetch(`https://api.braflix.st/${server}/sources-with-title?title=${query}&year=${year}&mediaType=${type}&episodeId=${episode}&seasonId=${season}&tmdbId=${movieId}`, {
            headers: {
                Accept: "application/json",
                UserAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_4_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5.2 Safari/605.1.15"
            }
        });
        const textData = await response.text();

        let jsonData;
        try {
            jsonData = JSON.parse(textData);
            if (jsonData.error) {
                return res.status(500).json({ error: jsonData.error, message: jsonData.message, statusCode: jsonData.statusCode });
            }
        } catch (e) {
            jsonData = { id: textData };
        }
        console.log(jsonData);
        res.json(jsonData);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});*/

/**
 *  Cross proxy used to get movie id from Braflix server. (with proxy middleware)
 * */
app.use('/api/getMovieIdBraflix', createProxyMiddleware({
    target: 'https://api.braflix.st',
    changeOrigin: true,
    followRedirects: false,
    pathRewrite: (path, req) => {
        const { server, query, year, type, episode, season, movieId } = req.query;

        return `/${server}/sources-with-title?title=${query.trim().replace(/\s+/g, '+').replace(/&/g, '%26')}&year=${year}&mediaType=${type}&episodeId=${episode}&seasonId=${season}&tmdbId=${movieId}`;
    },
    selfHandleResponse: true,
    on: {
        proxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
            try {
                if (!responseBuffer || typeof responseBuffer !== 'object' || responseBuffer.length === 0) {
                    throw new Error('Invalid or empty response from target server');
                }
                const response = responseBuffer.toString('utf8');

                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
                res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
                res.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36');
                return JSON.stringify({ id: response });
            } catch (error) {
                res.statusCode = 500;
                return JSON.stringify({ error: 'Failed to process response from target server' });
            }
        }),
    },
    headers: {
        Accept: "application/json",
        'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
    }
}));

app.use('/api/getOmegaLink', createProxyMiddleware({
    target: 'https://vidlink.pro',
    changeOrigin: true,
    followRedirects: false,
    pathRewrite: (path, req) => {
        const { movieId, mediaType, season, episode } = req.query;
        if(season && episode) {
            return `/${mediaType}/${movieId}/${season}/${episode}?primaryColor=ffffff&secondaryColor=c9c9c9&poster=true&autoplay=true`;
        } else {
            return `/${mediaType}/${movieId}?primaryColor=ffffff&secondaryColor=c9c9c9&poster=true&autoplay=true`;
        }
    },
    selfHandleResponse: true,
    on: {
        proxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
            try {
                let link;
                if(req.query.season && req.query.episode) {
                    link = `https://vidlink.pro/${req.query.mediaType}/${req.query.movieId}/${req.query.season}/${req.query.episode}?primaryColor=ffffff&secondaryColor=c9c9c9&poster=true&autoplay=true`;
                } else {
                    link = `https://vidlink.pro/${req.query.mediaType}/${req.query.movieId}?primaryColor=ffffff&secondaryColor=c9c9c9&poster=true&autoplay=true`;
                }
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
                res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
                res.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36');

                if (proxyRes.statusCode === 200) {
                    return JSON.stringify({ link:  link});
                } else {
                    res.statusCode = proxyRes.statusCode;
                    return JSON.stringify({ error: 'Failed to fetch movie data' });
                }
            } catch (error) {
                res.statusCode = 500;
                return JSON.stringify({ error: 'Failed to process response from target server' });
            }
        }),
    },
    headers: {
        Accept: "application/json",
        'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
    }
}));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
});

app.get('/', async (req, res) => {
    res.status(200).json({ message: 'Server is online' });
});

app.listen(3000, () => {
    console.log('Proxy server is online on port 3000');
});
