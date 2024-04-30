# Weather App

## Vite + Typescript + React + Express + MUI + Docker 

This is a simple weather app that uses the weatherapi.com API to fetch weather data for a searched city. It can serve as boilerplate for a fullstack application using Vite, Typescript, React, Express, Material-UI, Zustand, Docker, and Docker Compose.

The weatherapi.com API key in this project will soon expire. To get a new one, visit [weatherapi.com](https://www.weatherapi.com/). you can replace the API key in the `.env` file in the `server` directory or write it directly in the `server/src/app.ts` file.

### Features

- Search for a city and get the current weather
- Ability to view previously searched cities 
- Ability to remove previously searched cities from saved list
- Searches are persisted to local storage

### Tech Stack

- Vite
- Typescript
- React
- Express
- Material-UI
- Zustand
- Docker
- Docker Compose

### Running the app

To run the app via docker-compose, run the following commands:

```bash
docker-compose build
docker-compose up
```

The client app will be available at `http://localhost:5173`
The server will serve on `http://localhost:3001`

Alternatively, to run the app locally run the following commands:

```bash
## start client
cd client
npm install
npm run dev

## start server
cd ..
cd server
npm install
npm run dev
```