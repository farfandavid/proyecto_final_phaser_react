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