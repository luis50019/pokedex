import { contextPokemons } from "../Context/Pokemons.jsx";
import { useContext} from "react"
import "../styles/typeCard.css"
import { colorType } from "../data/colorTypesPokemon";

export function TypeCard({ type, url = null,showTypes}){

  const {getTypePokemon,changeTypeSelect} = useContext(contextPokemons);
  
  const handleClick =()=>{
    changeTypeSelect(type)
    getTypePokemon(url);
    showTypes()
  }
  return(
    <span className="container-types-pokemon" >
      <span className="card-type" style={{
      backgroundColor:`${colorType[type]}` 
    }} onClick={handleClick}>{type}</span>
    </span>
  )
}