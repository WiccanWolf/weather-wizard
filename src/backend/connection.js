import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import cors from 'cors';
dotenv.config();

const port = 3752;
const app = express();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Recieved request from origin: ${req.headers.origin}`);
  next();
});

const baseUrl = process.env.VITE_WEATHER_BASE_URL;

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Hello world!' });
});

app.get('/current', async (req, res) => {
  const { q } = req.query;
  const key = process.env.VITE_WEATHER_API_KEY;
  console.log(`GET /current | q=${q}`);
  if (!q) {
    return res.status(400).send({ error: 'Missing required query parameter.' });
  }
  try {
    const response = await axios.get(`${baseUrl}/current.json`, {
      params: { key, q },
    });
    res.status(200).send(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send({ error: 'Failed to fetch weather data.' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
