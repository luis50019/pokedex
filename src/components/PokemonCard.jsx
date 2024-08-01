import "../styles/pokemonCard.css"
import { useContext, useEffect } from "react";
import { colorType } from "../data/colorTypesPokemon"
import { TypeCard } from "./TypeCard"
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { contextFavorites, Favorites } from "../Context/Favorites";
export function PokemonCard({pokemon, pokemonSelect,addFavorite,isLike = false}) {
  
  const { removePokemonSelect} = useContext(contextFavorites);
  const [isFavorite,setIsFavorite] = useState(isLike);
  const { pokemonDelete,pokemonsFavorites } = useContext(contextFavorites);

  useEffect(()=>{
    const pokemonIsFavorite = pokemonsFavorites.some(pok => pok.id === pokemon.id);
    if(pokemonIsFavorite){
      setIsFavorite(true)
    }
    if(pokemonDelete && isFavorite){
      setIsFavorite(!(pokemonDelete.some(item => item.id == pokemon.id)))
      return 
    }
  },[pokemonDelete])

  const showPokemon =()=>{
    pokemonSelect(pokemon)
  }
  const handleClick =()=>{
    setIsFavorite(!isFavorite);
    if(!isFavorite){
      addFavorite(pokemon);
    }else{

      removePokemonSelect(pokemon);
    }
  }
  return (
    <>
      <article className="container-pokemon-card" style={{
        background: `${colorType[pokemon.types[pokemon.types.length - 1].type.name]}`
      }} onClick={showPokemon}>
        <div className="container-pokemon-info">
          <span className="pokemon-info-number">#
            {pokemon.id >= 10 ? (`000${pokemon.id}`) : (`0000${pokemon.id}`)}
            <FaHeart 
              className={`iconFavorite  ${isFavorite?"active":""}`} 
              onClick={(e)=>{
                handleClick()
                e.stopPropagation();
              }}/>
          </span>
          <p className="pokemon-info-name">{pokemon.name}</p>
          <div className="pokemon-info-data-types">
            <small>Tipos</small>
            {
              pokemon.types.map((info, index) =>(
                <TypeCard key={index} type={info.type.name}/>
              ))
            }
          </div>
        </div>
        <div className="container-pokemon-img"
          style={{
            height: "100%",
            width: "30%",
            backgroundImage:`url(${pokemon.sprites.other.dream_world.front_default})`,
            backgroundSize: "contain",
            backgroundPosition: "0px",
            backgroundRepeat: "no-repeat",
            transform: "scale(1.4)",
            zIndex: "10"
          }}>

        </div>
      </article>
    </>
  )
}