import { createRoot } from "react-dom/client";
import { App } from "./src/App"; 
import { Pokemons } from "./src/Context/Pokemons";
createRoot(document.getElementById("app")).render(
  <Pokemons>
    <App></App>
  </Pokemons>
) 