//import { getApiUrl } from "./config"
import { getApiPokemonUrl } from "./config";

export const getPokemon = async (pokemonId) => {
  return await fetch(getApiPokemonUrl('pokemon/' + pokemonId))
    .then(response => response.json());
}

export const getCountPokemon = () => {
  return fetch(getApiPokemonUrl('pokemon/'))
    .then(response => response.json());
}

export const getAllPokemon = () => {
  return fetch(getApiPokemonUrl('pokemon?limit=905&offset=0'))
    .then(response => response.json());
}