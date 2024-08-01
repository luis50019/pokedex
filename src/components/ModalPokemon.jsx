import "../styles/Modal.css"
import { FaHeart } from "react-icons/fa";
import { TypeCard } from "./TypeCard";
import { LevelBar } from "./LevelBar";
import { IoMdClose } from "react-icons/io";
import { useEffect } from "react";

export function ModalPokemon({closeModal,isOpen,pokemon,isFavorite}) {
  useEffect(()=>{
    document.body.style.overflow = "hidden"
  },[isOpen])
  return (
    <>
      <div className="container-modal">
        <IoMdClose onClick={closeModal} className="icon-close-modal"/>
        <div className="modal">
          <div className="modal-header">
            <span className="modal-header-num">#0{pokemon.id}</span>
            
          </div>
          <div className="modal-img">
            <img className="img-pokemon" src={pokemon.sprites.other.dream_world.front_default} />
          </div>
          <div className="modal-info">
            <div className="modal-info-types">
              TIPO:
              {
                pokemon.types.map((type,index) =>(
                  <TypeCard key={index} type={type.type.name} />
                ))
              }
            </div>
            <div className="modal-info-characteristics">
              {
                pokemon.stats.map((item,index) =>(
                  <LevelBar name={item.stat.name} level={item.base_stat} />
                ))
              }
            </div>
            <p className="modal-info-weight">peso: {pokemon.weight}Kg</p>
          </div>
        </div>

      </div>
    </>
  )
}