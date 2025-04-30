// utils/api.js
import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

export const getAllPokemon = async (limit = 20, offset = 0) => {
  try {
    const response = await axios.get(`${API_URL}?limit=${150}&offset=${offset}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    return [];
  }
};

export const getPokemonDetail = async (nameOrId) => {
  try {
    const response = await axios.get(`${API_URL}/${nameOrId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for ${nameOrId}:`, error);
    return null;
  }
};