import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import {createProxyMiddleware, responseInterceptor} from 'http-proxy-middleware';

const app = express();

app.use(cors());

/**
 *  Cross proxy used to get movie id from Piracy server.
 * */
app.get('/api/getMovieId', async (req, res) => {
    const { query, type, year } = req.query;
    const response = await fetch(`https://vsrc.piracy.su/search?query=${query}&type=${type}&year=${year}`, {
        headers: {
            Accept: "application/json",
            UserAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_4_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5.2 Safari/605.1.15"
        }
    });
    const data = await response.json();
    res.json(data);
});

/**
 *  Cross proxy used to get movie links from Piracy servers.
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
 *  Cross proxy used to get movie id from Braflix server.
 * */
app.get('/api/getMovieIdBraflix', async (req, res) => {
    const { server, query, year, type, episode, season, movieId } = req.query;
    //const encodedQuery = encodeURIComponent(query).replace(/%20/g, '+');
    try {
        const response = await fetch(`https://api.braflix.ru/${server}/sources-with-title?title=${query}&year=${year}&mediaType=${type}&episodeId=${episode}&seasonId=${season}&tmdbId=${movieId}`, {
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
});

/**
 *  Cross proxy used to get movie id from Braflix server.
 * */
/*app.use('/api/getMovieIdBraflix', createProxyMiddleware({
    target: 'https://api.braflix.ru',
    changeOrigin: true,
    pathRewrite: (path, req) => {
        const { server, query, year, type, episode, season, movieId } = req.query;
        return `/${server}/sources-with-title?title=${query}&year=${year}&mediaType=${type}&episodeId=${episode}&seasonId=${season}&tmdbId=${movieId}`;
    },
    selfHandleResponse: true,
    on: {
        proxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
            try {
                const response = responseBuffer.toString('utf8');

                return response || '';
            } catch (error) {
                console.error('Error processing response:', error.message);
                return '';
            }
        }),
    },
    headers: {
        Accept: "application/json",
        'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_4_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5.2 Safari/605.1.15"
    }
}));*/

/**
 *  Cross proxy used to get movie link from RabbitStream using Braflix's movie id.
 * */
app.get('/api/getRabbitStream', async (req, res) => {
    const { id } = req.query;
    const response = await fetch(`https://rabbitstream.net/v2/embed-4/${id}?_debug=true`, {
        headers: {
            Accept: "application/json",
            UserAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_4_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5.2 Safari/605.1.15"
        }
    });
    const data = await response;
    res.json(data);
});

/**
 *  Cross proxy used to get movie link from Megacloud using Braflix's movie id.
 * */
app.get('/api/getMegacloud', async (req, res) => {
    const { id } = req.query;
    const response = await fetch(`https://megacloud.tv/embed-1/e-1/${id}?_debug=true`, {
        headers: {
            Accept: "application/json",
            UserAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_4_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5.2 Safari/605.1.15"
        }
    });
    const data = await response;
    res.json(data);
});

app.listen(3000, () => {
    console.log('Proxy server is online on port 3000');
});
