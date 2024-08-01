import { useContext, useState } from "react"
import { contextPokemons } from "../Context/Pokemons.jsx";
import { TypeCard } from "./TypeCard.jsx";
import { FiChevronDown } from "react-icons/fi";
import { IoIosArrowUp } from "react-icons/io";

export function Types() {
  const { types } = useContext(contextPokemons);
  const [showTypes, setShowTypes] = useState(false);

  const handleClick = () => {
    setShowTypes(!showTypes)
  }
  return (
    <>
      <span className="span-type">TIPOS {showTypes?<IoIosArrowUp onClick={handleClick}/>:<FiChevronDown onClick={handleClick} />}</span>
      <div className={`header-container-types-pokemon ${showTypes?"show":""}`}>
        {
          types.map((type, index) => {
            return (
              <TypeCard key={index} type={type.name} url={type.url} showTypes={handleClick} />
            )
          })
        }
      </div>
    </>
  )
}