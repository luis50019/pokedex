import { createContext, useCallback, useState } from "react";

export const contextPokemons = createContext();
const URL_BASE = "https://pokeapi.co/api/v2"
//https://pokeapi.co/api/v2/pokemon

export function Pokemons({ children }) {
  const [pokemons, setPokemons] = useState([]);
  const [types,setTypes] = useState([]);
  const [typeSelect, setTypeSelect] = useState("All");
  const [error,setError] = useState({"message":"nada","error":false});
  
  const changeTypeSelect =(name)=>{
    setTypeSelect(name);
  }
  const getPokemon = useCallback(async(name)=>{
    try{
      const res = await fetch(`${URL_BASE}/pokemon/${name}`);
      if(!res.ok){
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setPokemons([data])
    }catch(e){
      const newError = { "message": "pokemon no encontrado", "error": true };
      setError(newError);
    }
  },[])
  const getInfoPokemon = async (url) => {
    try {
      const res = await fetch(url);
      if(!res.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await res.json();
      data.favorite = false;
      return data
    } catch (e) {
      const newError = { "message": "Error al obtenener la informacion del pokemon", "error": true };
      setError(newError);
    }
  }
  const getTypePokemon = async (urlType) => {
    try {
      const res = await fetch(urlType);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      const arrPokemons = data.pokemon;
      const pokemonPromises = arrPokemons.slice(0, 10).map((pokemon) => {
        return getInfoPokemon(pokemon.pokemon.url);  // Debería usar pokemon.pokemon.url en lugar de pokemon.url
      });
  
      const pokemonData = await Promise.all(pokemonPromises);
      const validPokemonData = pokemonData.filter(pokemon => pokemon !== null);
      setPokemons(validPokemonData);
   
      const newError = { "message": "Pokemons fetched successfully", "error": false };
      setError(newError);
    } catch (e) {
      const newError = { "message": "Error al obtener los pokemones", "error": true };
      setError(newError);
    }
  };
  const getPokemons = async () => {
    try {
      const response = await fetch(`${URL_BASE}/pokemon`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const arrPokemons = data.results
      // obtenemos informacion de cada pokemon y lo almacenamos en el estado de pokemons
      // hacemos un mapeo de todo el arreglo de pokemos que nos regreso el primer fecth
      const pokemonPromises = arrPokemons.map(pokemon => getInfoPokemon(pokemon.url));
      //indicamos que debe de esperar a  que teodas las promesas se cumplan para continuar
      const pokemonData = await Promise.all(pokemonPromises);
      // Filtramos cualquier valor null que pueda haber regresado `getInfoPokemon`
      const validPokemonData = pokemonData.filter(pokemon => pokemon !== null && pokemon.sprites !== null);
      //guardamos los valores obtenidos en el estado de pokemons
      setPokemons(validPokemonData);
      const newError = {"message":"","error":false}
      setError(newError)
    } catch (error) {
      const newError = {"message":"Error al obtener los pokemones","error":true}
      setError(newError)
    }
  };

  const getTypesPokemons = async()=>{
    try{
      const res = await fetch(`${URL_BASE}/type`);
      const data =await res.json();
      setTypes(data.results)
    }catch(e){
      console.log(e);
    }
  }

  return (
    <contextPokemons.Provider value={{
      pokemons,
      types,
      getTypesPokemons,
      getPokemons,
      getTypePokemon,
      typeSelect,
      changeTypeSelect,
      getPokemon,
      error
    }}>
      {children}
    </contextPokemons.Provider>
  )
}