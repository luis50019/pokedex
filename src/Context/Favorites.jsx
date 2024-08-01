import { Children, createContext, useState } from "react"

export const contextFavorites = createContext('');

export function Favorites({children}){
  const [pokemonsFavorites,setPokemonsFavorites] = useState([]);
  const [pokemonDelete,setPokemonDelete] = useState([]);
  
  const addPokemon =(pokemon)=>{
    if(pokemonsFavorites.some(item => item.id === pokemon.id)){
      return 
    }
    const arrPokemonsFavorite = structuredClone(pokemonsFavorites);
    setPokemonsFavorites([...arrPokemonsFavorite,pokemon])
  }
  
  const removePokemonSelect = (pokemon)=>{
    const newArr = pokemonsFavorites.filter(pokemons => pokemons.id !== pokemon.id);
    setPokemonsFavorites(newArr);
    setPokemonDelete([... pokemonDelete,pokemon])
  }

  const cleanPokemonsFavorites =()=>{
    setPokemonDelete([...pokemonsFavorites])
    setPokemonsFavorites([]);
  }

  return(
    <contextFavorites.Provider value={{
      addPokemon,
      cleanPokemonsFavorites,
      removePokemonSelect,
      pokemonsFavorites,
      pokemonDelete
    }}>
      {children}
    </contextFavorites.Provider>
  )
}