import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import debounce from "just-debounce-it";
import { contextPokemons } from "../Context/Pokemons";

const regexSearch = /\d|[«#$%&/()=*]/;

export function Seeker() {

  const {getPokemon,getPokemons} = useContext(contextPokemons)
  const [search, setSearch] = useState("");
  const [errorSearch, setErroSearch] = useState("");// " ", es igual a false
  const refInput = useRef(0);
  
  const updateSearch = (newSearch) => {
    if (newSearch.startsWith(' ')) return
    setSearch(newSearch);
  }
  
  const debounceGetPokemon = useCallback(
    debounce(search =>{
      if(!search){
        getPokemons();
        return;
      }else{
        getPokemon(search)
      }
    },3000)
    ,[getPokemon]
  )

  useEffect(() => {
    //validamos que no tenga numeros o simbolos
    if (search.match(regexSearch)) {
      setErroSearch("no puede contener simbolos o numeros");
      return
    }
    if (search.length == 0 && refInput.current == 1) {
      setErroSearch("Ingrese el nombre del pokemon");
      return;
    }
    setErroSearch("");
  }, [search]);

  const handleChange = (event) => {
    refInput.current = 1;
    const newSearch = event.target.value;
    updateSearch(newSearch);
    debounceGetPokemon(newSearch)
  }
  const handleSubmit =(event)=>{
    event.preventDefault();
    if(!search){
      getPokemons();
    }else{
      getPokemon(search);
    }
  }
  return (
    <>
      <form className="header-search" onSubmit={handleSubmit}>
        <input ref={refInput} style={{
          color: errorSearch ? "#f00" : ""
        }}
          className="header-search-input" value={search} onChange={handleChange} type="text" placeholder="pikachu,bulbasur" />
        <button className="header-search-button"><FaSearch /></button>
      </form>
      <p style={{
          color: errorSearch ? "#f00" : ""
        }}>{errorSearch ? errorSearch : ""}</p>
    </>
  )
}