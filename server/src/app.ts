
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { WeatherData } from './types';

const app = express();

app.use(cors()); 

const API_KEY = process.env.API_KEY || "3d8fcb5ce8a249b38d8150736242904"
const BASE_URL = "http://api.weatherapi.com/v1"

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});


app.get('/api/weather', async (req, res) => {
  const city = req.query.city as string; 

  if (!city) {
    return res.status(400).json({ error: 'Please provide a city name' });
  }

  // regex to check if city contains only letters and spaces
  if (!/^[a-zA-Z\s]*$/.test(city)) {
    return res.status(400).json({ error: 'City name must contain only letters' });
  }
  
  try {
    const response = await axios.get<WeatherData>(`${BASE_URL}/current.json?key=${API_KEY}&q=${city}`); // Adjust API call if needed
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});