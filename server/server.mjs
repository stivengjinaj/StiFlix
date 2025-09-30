import express from 'express';
import cors from 'cors';
import {createProxyMiddleware, responseInterceptor} from 'http-proxy-middleware';
import {URL} from "url";
import axios from 'axios';

const PORT = 3000;

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

let targetDomain = '';

// Comprehensive ad domains list - ADD NEW AD DOMAINS HERE
const AD_DOMAINS = [
    'ssqhllcmga', 'plkpmfrf', 'intellipup', 'd3mr7y154d2qg5',
    'adsco.re', 'itktymvfvnjps', 'popads', 'popcash',
    'propellerads', 'adsterra', 'exoclick', 'trafficjunky',
    'juicyads', 'plugrush', 'trafficstars', 'adcash',
    'adskeeper', 'mgid', 'outbrain', 'taboola', 'revcontent',
    'bidvertiser', 'adnow', 'contentad', 'infolinks',
    'clickadu', 'hilltopads', 'adspygoogle', 'advertising',
    'adserver', 'doubleclick', 'googlesyndication', 'advertising.com',
    'adform', 'criteo', 'openx', 'pubmatic', 'rubiconproject',
    'brightadnetwork', 'adscope.gotrackier.com'
];

// GLOBAL MIDDLEWARE
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
});

// Helper: Check if URL contains ad domains
function isAdUrl(url) {
    const lowerUrl = url.toLowerCase();
    return AD_DOMAINS.some(domain => lowerUrl.includes(domain));
}

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

// BLOCK AD REQUESTS COMPLETELY
app.use((req, res, next) => {
    if (isAdUrl(req.originalUrl)) {
        console.log('Blocked ad request:', req.originalUrl);
        return res.status(204).send();
    }
    next();
});

// Next.js chunks handler
app.get('/_next/*', async (req, res) => {
    if (!targetDomain) {
        return res.status(404).send('Target domain not set.');
    }

    const resourceUrl = targetDomain + req.originalUrl;

    if (isAdUrl(resourceUrl)) {
        return res.status(204).send();
    }

    console.log('Proxying Next.js chunk:', resourceUrl);

    try {
        const response = await axios.get(resourceUrl, {
            headers: {
                'User-Agent': req.headers['user-agent'],
                'Referer': targetDomain
            },
            responseType: 'arraybuffer',
            validateStatus: () => true,
        });

        if (response.status >= 400) {
            return res.status(response.status).send(`Resource error: ${resourceUrl}`);
        }

        let contentType = response.headers['content-type'] || '';
        const urlPath = new URL(resourceUrl).pathname;
        const extension = urlPath.split('.').pop().toLowerCase();

        if (!contentType.includes('javascript') && extension === 'js') {
            contentType = 'application/javascript';
        } else if (!contentType.includes('css') && extension === 'css') {
            contentType = 'text/css';
        } else if (!contentType.includes('json') && extension === 'json') {
            contentType = 'application/json';
        }

        res.setHeader('Content-Type', contentType);
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Next.js chunk proxy error:', error.message);
        res.status(500).send('Proxy error: ' + error.message);
    }
});

// Main proxy handler
app.get('/proxy/*', async (req, res) => {
    try {
        const targetPath = req.params[0];
        const queryString = req.originalUrl.split('?')[1] || '';
        const targetUrl = targetPath + (queryString ? '?' + queryString : '');

        if (isAdUrl(targetUrl)) {
            console.log('🚫 Blocked ad URL:', targetUrl);
            return res.status(204).send();
        }

        console.log('Proxying:', targetUrl);

        const response = await axios.get(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': req.headers.accept || '*/*',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Referer': targetDomain || targetUrl,
                'Origin': targetDomain
            },
            responseType: 'arraybuffer',
            maxRedirects: 5,
            validateStatus: () => true,
            timeout: 30000
        });

        if (response.status >= 400) {
            console.error(`Error ${response.status} for ${targetUrl}`);
            return res.status(response.status).send(`Resource not found: ${targetUrl}`);
        }

        const contentType = response.headers['content-type'] || '';

        // Handle HTML
        if (contentType.includes('text/html')) {
            let html = response.data.toString('utf-8');
            const urlObj = new URL(targetUrl);
            targetDomain = urlObj.origin;

            // === AD BLOCKING - CONSERVATIVE APPROACH ===

            // 1. Remove script tags with ad-related IDs or known ad sources
            html = html.replace(
                /<script[^>]*(?:id=["']popads|data-cfasync=["']false["']|referrerpolicy=["']unsafe-url["'])[^>]*>[\s\S]*?<\/script>/gi,
                '<!-- Ad script removed -->'
            );

            // 2. Remove scripts with ad domain sources
            html = html.replace(
                /<script[^>]*src=["']([^"']+)["'][^>]*><\/script>/gi,
                (match, src) => {
                    if (isAdUrl(src)) {
                        console.log('🚫 Removed ad script:', src);
                        return '<!-- Ad script removed -->';
                    }
                    return match;
                }
            );

            // 3. Remove ad-related divs and elements
            html = html.replace(
                /<(?:div|a)[^>]*(?:id|class|href)=["'][^"']*(?:dontfoid|itktymvfvnjps)[^"']*["'][^>]*>[\s\S]*?<\/(?:div|a)>/gi,
                '<!-- Ad element removed -->'
            );

            // 4. Inject client-side ad blocker
            const adBlockScript = `
<script>
(function() {
    'use strict';
    console.log('Ad blocker initializing...');
    
    // Block window.open (popups/popunders)
    const originalOpen = window.open;
    window.open = function() {
        console.log('Popup blocked');
        return null;
    };
    
    // Freeze window.open to prevent reassignment
    try {
        Object.defineProperty(window, 'open', {
            value: function() { return null; },
            writable: false,
            configurable: false
        });
    } catch(e) {}
    
    // Neutralize common ad variables
    const adVars = ['popads', 'popcash', '_pop', 'adsbygoogle', 'popAds'];
    adVars.forEach(v => {
        try {
            Object.defineProperty(window, v, {
                get: () => null,
                set: () => {},
                configurable: false
            });
        } catch(e) {}
    });
    
    // Block clicks on ad links
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && e.target.href) {
            const href = e.target.href.toLowerCase();
            const adDomains = ${JSON.stringify(AD_DOMAINS)};
            if (adDomains.some(d => href.includes(d))) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Blocked ad click:', e.target.href);
                return false;
            }
        }
    }, true);
    
    // Block dynamic ad script/iframe injection
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.tagName === 'SCRIPT' && node.src) {
                    const adDomains = ${JSON.stringify(AD_DOMAINS)};
                    if (adDomains.some(d => node.src.toLowerCase().includes(d))) {
                        console.log('Blocked dynamic ad script:', node.src);
                        node.remove();
                    }
                }
                if (node.tagName === 'IFRAME' && node.src) {
                    const adDomains = ${JSON.stringify(AD_DOMAINS)};
                    if (adDomains.some(d => node.src.toLowerCase().includes(d))) {
                        console.log('Blocked ad iframe:', node.src);
                        node.remove();
                    }
                }
            });
        });
    });
    
    if (document.documentElement) {
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }
    
    console.log('Ad blocker active');
})();
</script>`;

            html = html.replace(/(<head[^>]*>)/i, '$1' + adBlockScript);

            // 5. Rewrite resource URLs
            html = html.replace(
                /(href|src)=["'](\/[^"']*|https?:\/\/[^"']*vidlink[^"']*|_next\/[^"']*)["']/gi,
                (match, attr, url) => {
                    if (url.startsWith('data:') || url.startsWith('blob:') ||
                        url.startsWith('javascript:') || isAdUrl(url)) {
                        return match;
                    }

                    if (url.includes('/wsrv.nl/')) {
                        return `${attr}="${targetDomain + url}"`;
                    }

                    let fullUrl = url;
                    if (url.startsWith('/') || url.startsWith('_next/')) {
                        fullUrl = targetDomain + '/' + url.replace(/^\/+/, '');
                    }

                    return `${attr}="http://localhost:${PORT}/proxy/${fullUrl}"`;
                }
            );

            // Don't proxy CDN URLs
            html = html.replace(
                /http:\/\/localhost:3000\/proxy\/(https?:\/\/(?:cdn\.jwplayer|ssl\.p\.jwpcdn|www\.gstatic|mc\.yandex|www\.clarity|www\.googletagmanager)[^"']*)/gi,
                '$1'
            );

            html = html.replace(/if\s*\(\s*top\s*!==\s*self\s*\)\s*top\.location\s*=\s*self\.location\s*;?/gi, '// removed frame-buster');

            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            return res.send(html);
        }

        // Handle JavaScript - minimal sanitization
        if (contentType.includes('javascript') || contentType.includes('application/json')) {
            let js = response.data.toString('utf-8');
            // Only replace obvious ad variables, don't break legitimate code
            js = js.replace(/\bpopads\b/gi, 'blocked_ads');
            res.setHeader('Content-Type', contentType);
            return res.send(js);
        }

        // Handle CSS
        if (contentType.includes('text/css')) {
            let css = response.data.toString('utf-8');

            css = css.replace(
                /url\(['"]?([^'")]+)['"]?\)/gi,
                (match, url) => {
                    if (url.startsWith('data:') || url.startsWith('blob:')) {
                        return match;
                    }

                    let fullUrl = url;
                    if (url.startsWith('/')) {
                        fullUrl = targetDomain + url;
                    } else if (!url.startsWith('http')) {
                        const baseUrl = new URL(targetUrl);
                        fullUrl = new URL(url, baseUrl.href).href;
                    }

                    return `url("http://localhost:${PORT}/proxy/${fullUrl}")`;
                }
            );

            res.setHeader('Content-Type', contentType);
            return res.send(css);
        }

        // Pass through other resources
        res.setHeader('Content-Type', contentType);
        Object.entries(response.headers).forEach(([key, value]) => {
            const lower = key.toLowerCase();
            if (lower === 'x-frame-options') return;
            if (lower === 'content-security-policy') return;
            res.setHeader(key, value);
        });
        res.send(response.data);

    } catch (error) {
        console.error('Proxy error:', error.message);
        res.status(500).send('Proxy error: ' + error.message);
    }
});

app.get('/', (req, res) => {
    const videoUrl = req.query.url;

    if (!videoUrl) {
        return res.send(`
            <h1>Video Proxy Server with Ad Blocking</h1>
            <p>Usage: /?url=YOUR_VIDEO_URL</p>
            <hr>
            <h2>How to Block New Ads Manually:</h2>
            <ol>
                <li><strong>Open Browser Console</strong> (F12 or Right-click → Inspect → Console)</li>
                <li><strong>Look for blocked messages</strong> in the console logs</li>
                <li><strong>If an ad appears:</strong>
                    <ul>
                        <li>Check the Network tab for new requests</li>
                        <li>Look for suspicious domains in the URLs</li>
                        <li>Copy the domain name (e.g., "newaddomain.com")</li>
                    </ul>
                </li>
                <li><strong>Add the domain to AD_DOMAINS array</strong> in the code:
                    <pre>const AD_DOMAINS = [
    'ssqhllcmga', 'plkpmfrf', ...,
    'newaddomain',  // ADD HERE
];</pre>
                </li>
                <li><strong>Restart the server</strong></li>
            </ol>
            <hr>
            <h3>Quick Debug Tips:</h3>
            <ul>
                <li>Console shows: "🚫 Blocked ad..." = Successfully blocking</li>
                <li>Console shows: "Proxying: ..." = Check if it's an ad domain</li>
                <li>Look for script errors = Might indicate ad blocker working</li>
                <li>Use Network tab → Filter by "JS" to see all scripts loading</li>
            </ul>
        `);
    }

    try {
        const urlObj = new URL(videoUrl);
        targetDomain = urlObj.origin;
    } catch (e) {
        targetDomain = '';
    }

    res.redirect(`/proxy/${videoUrl}`);
});

// Catch-all handler
app.get('*', async (req, res) => {
    if (req.path === '/favicon.ico') {
        return res.status(404).send('Not found');
    }

    if (targetDomain) {
        const resourceUrl = targetDomain + req.originalUrl;

        if (isAdUrl(resourceUrl)) {
            console.log('🚫 Blocked ad in catch-all:', resourceUrl);
            return res.status(204).send();
        }

        console.log(`Catch-all proxying: ${resourceUrl}`);

        try {
            const response = await axios.get(resourceUrl, {
                headers: { 'User-Agent': req.headers['user-agent'] },
                responseType: 'arraybuffer',
                validateStatus: () => true,
            });

            const contentType = response.headers['content-type'] || 'application/octet-stream';

            if (contentType.includes('text/html') && req.path.match(/\.(js|css|json)$/i)) {
                let correctedType = 'application/octet-stream';
                if (req.path.endsWith('.js')) correctedType = 'application/javascript';
                if (req.path.endsWith('.css')) correctedType = 'text/css';
                if (req.path.endsWith('.json')) correctedType = 'application/json';

                res.setHeader('Content-Type', correctedType);
                return res.status(response.status).send(`/* Resource not found: ${resourceUrl} */`);
            }

            res.setHeader('Content-Type', contentType);
            res.status(response.status).send(response.data);

        } catch (error) {
            console.error('Catch-all proxy error:', error.message);
            res.status(500).send('Proxy error: ' + error.message);
        }
    } else {
        res.status(404).send('Resource not found and target domain not set.');
    }
});

app.listen(3000, () => {
    console.log(`Proxy server is online on port ${PORT}`);
});
