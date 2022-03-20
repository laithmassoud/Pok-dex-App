import React from "react";
import { APIContextProvider } from "./apiContext";
import Pokemons from "./components/Pokemons";
import "./scss/index.scss";

export default function App() {
  return (
    <APIContextProvider>
      <div className="App">
        <div className="App-header">
          <img
            src={process.env.PUBLIC_URL + 'pokemon_logo.png'}
            className="App-header-logo"
            alt="logo"
          />
          <h2>Pokédex</h2>
        </div>
        <Pokemons />
      </div>
    </APIContextProvider>
  );
}
