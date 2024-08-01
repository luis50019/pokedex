import "../style.css"
import { Types } from "./components/Types";
import { MainPokemon } from "./components/MainPokemon";
import { Seeker } from "./components/Seeker";

import { Favorites } from "./Context/Favorites";

export function App() {
  return (
    <>
      <Favorites>
        <header>
          <div className="header-title">
            <img className="header-title-img-pokemon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnpDDd16-m8fTneCbtEI1TYpDiVqegO11beA&s" />
            <img className="header-title-img-pikachu" src="https://www.esimagenes.com/pimagen/imagen-pikachu-sin-fondo.png" />
          </div>
          <Seeker />
          <Types />
        </header>
        <MainPokemon />
      </Favorites>
    </>
  )
}