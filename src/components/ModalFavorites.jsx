import { contextFavorites } from "../Context/Favorites"
import { useContext } from "react"
import { PokemonCard } from "./PokemonCard";
import { IoMdClose } from "react-icons/io";
import "../styles/modalFavorites.css"

export function ModaFavorites({closeModal}) {
  const { cleanPokemonsFavorites, pokemonsFavorites } = useContext(contextFavorites);

  const handleClick = () => {
    cleanPokemonsFavorites();
  }

  return (
    <>
      <div className="container-modal">
        <IoMdClose onClick={closeModal} className="icon-close-modal"/>
        <div className="modal">
          <div className="modal-favorites-header">
            <p className="modal-favorites-header-title">POKEMONES FAVORITOS</p>
            <p className="modal-favorites-header-cant">cantidad: {pokemonsFavorites.length}</p>
          </div>
          <div className="modal-favorites-main">
            {
              pokemonsFavorites ? pokemonsFavorites.map(pokemon => (
                <PokemonCard pokemon={pokemon} isLike={true} />
              )) : "Aun no tienes pokemones favoritos"
            }
          </div>
          <div className="modal-favorites-footer-clean">
            <button onClick={handleClick} className="btn-clean-pokemons">Borrar</button>
          </div>

        </div>
      </div>
    </>
  )

}