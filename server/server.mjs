import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

/**
 *  Cross proxy used to get movie id from Piracy server.
 * */
app.get('/api/getMovieId', async (req, res) => {
    const { query, type, year } = req.query;
    const response = await fetch(`https://vsrc.piracy.su/search?query=${query}&type=${type}&year=${year}`, {
        headers: {
            Accept: "application/json"
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
            Accept: "application/json"
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
    const encodedQuery = encodeURIComponent(query);
    try {
        const response = await fetch(`https://api.braflix.ru/${server}/sources-with-title?title=${query}&year=${year}&mediaType=${type}&episodeId=${episode}&seasonId=${season}&tmdbId=${movieId}`);
        const textData = await response.text();
        const jsonData = { id: textData };
        res.json(jsonData);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 *  Cross proxy used to get movie link from RabbitStream using Braflix's movie id.
 * */
app.get('/api/getRabbitStream', async (req, res) => {
    const { id } = req.query;
    console.log(`https://rabbitstream.net/v2/embed-4/${id}?_debug=true`);
    const response = await fetch(`https://rabbitstream.net/v2/embed-4/${id}?_debug=true`);
    const data = await response;
    res.json(data);
});

/**
 *  Cross proxy used to get movie link from Megacloud using Braflix's movie id.
 * */
app.get('/api/getMegacloud', async (req, res) => {
    const { id } = req.query;
    const response = await fetch(`https://megacloud.tv/embed-1/e-1/${id}?_debug=true`);
    const data = await response;
    res.json(data);
});

app.listen(3000, () => {
    console.log('Proxy server is running on http://localhost:3000');
});
