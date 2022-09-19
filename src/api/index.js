import axios from "axios";
import { config } from "../config";

export const getPokemons = async ({ endpoint, limit, offset }) =>
  await axios.get(
    `${config.APP_URL}${endpoint}?limit=${limit}&offset=${offset}`
  );

export const getAllPokemons = async (url) => await axios.get(url);

export const getDetailedInfo = async (url) => await axios.get(url);

export const getPokemonsAccordingTypes = async (url) => await axios.get(url);
