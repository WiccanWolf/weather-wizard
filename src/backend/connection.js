import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import cors from 'cors';
dotenv.config();

const app = express();

const allowedOrigins = [
  'http://127.0.0.1:5173',
  'https://weather-wizard-e39d.onrender.com',
];

const corsOption = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOption));
app.use(express.json());

const baseUrl = process.env.VITE_WEATHER_BASE_URL;

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Hello world!' });
});

app.get('/current', async (req, res) => {
  const { q } = req.query;
  const key = process.env.VITE_WEATHER_API_KEY;
  console.log(`GET /current | q=${q} | key=${key}`);
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
