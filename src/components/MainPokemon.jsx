import { useContext, useEffect, useState } from "react"
import { contextPokemons } from "../Context/Pokemons";
import { contextFavorites } from "../Context/Favorites";
import { PokemonCard } from "../components/PokemonCard";
import { ModalPokemon } from "./ModalPokemon";
import { ModaFavorites } from "./ModalFavorites";
import "../styles/icon.css";

function usePokemons(){
  const { pokemons, getTypesPokemons, getPokemons,typeSelect, error } = useContext(contextPokemons);
  const { addPokemon} = useContext(contextFavorites);
  const [pokemonSelect,setPokemonSelect] = useState({});
  const [showModal,setShosModal] = useState(false);
  const [showFavorites,setShowFavorites] = useState(false);

  useEffect(() => {
    getTypesPokemons();
    getPokemons();
  }, []);

  useEffect(()=>{
    if(!showModal){
      document.body.style.overflow = '';
    }
  },[showModal])

  const closeModal =()=>{
    setShosModal(!showModal);
  }

  const openModal =(pokemon)=>{
    setShosModal(!showModal)
    setPokemonSelect(pokemon);
  }
  return {setShowFavorites,typeSelect,showModal,openModal,closeModal,pokemonSelect,addPokemon,error,pokemons,showFavorites }
}

export function MainPokemon() {
  const {setShowFavorites,typeSelect,showModal,openModal,closeModal,pokemonSelect,addPokemon,error,pokemons,showFavorites } = usePokemons();
  

  return (
    <>
      {
        showModal?<ModalPokemon isOpen={showModal} pokemon={pokemonSelect} closeModal={closeModal}/>:""
      }
      <p className="span-tipe-pokemon">Tipo: {typeSelect}</p>
      <main className="main">
        {
          error.error ? (error.message)
            :
            pokemons.map(pokemon => (
              <PokemonCard 
                key={pokemon.id} 
                pokemonSelect={openModal}   
                addFavorite={addPokemon}                                   
                pokemon={pokemon}
                />
            ))
        }
      </main>
      {
        showFavorites?<ModaFavorites closeModal={()=> setShowFavorites(!showFavorites)}/>:""
      }
      <div 
        className="btn-pokemon-fovorite" onClick={()=> setShowFavorites(!showFavorites)}></div>
    </>
  )
}