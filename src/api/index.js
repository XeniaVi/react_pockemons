import axios from "axios";
import { config } from "../config";

export const getPokemons = async ({ endpoint, limit, offset }) => {
  return await axios.get(
    `${config.APP_URL}${endpoint}?limit=${limit}&offset=${offset}`
  );
};

export const getAllPokemons = async (url) => {
  return await axios.get(url);
};

export const getDetailedInfo = async (url) => {
  return await axios.get(url);
};

export const getPokemonsAccordingTypes = async (url) => {
  return await axios.get(url);
};
