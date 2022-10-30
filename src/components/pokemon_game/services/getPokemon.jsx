//import { getApiUrl } from "./config"
import { getApiPokemonUrl } from "./config";

export const getPokemon = (pokemonId) => {
  return fetch(getApiPokemonUrl('pokemon/' + pokemonId))
    .then(response => response.json())
}