import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import cors from 'cors';
dotenv.config();

const app = express();

const baseUrl = 'http://api.weatherapi.com/v1';

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Hello world!' });
});

app.get('/current', async (req, res) => {
  const { q } = req.query;
  const key = process.env.WEATHER_API_KEY;

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

app.use(cors());
app.use(express.json());
