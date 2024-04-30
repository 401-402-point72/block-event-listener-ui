import axios from "axios";

// Get the API key from environment variables
const API_KEY = import.meta.env.COINGECKO_API_KEY; // Get the key from the .env file

const coinGeckoClient = axios.create({
  baseURL: "https://api.coingecko.com/api/v3", // Base endpoint
  headers: {
    Authorization: `Bearer ${API_KEY}`, // Use the environment variable for the API key
  },
});

export default coinGeckoClient;
