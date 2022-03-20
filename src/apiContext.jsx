import React, { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";

const APIContext = createContext();

export function APIContextProvider({ children }) {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=151`
      );
      setPokemons(data);
      setLoading(false)
    }
    fetchData();
  }, []);

  const providerValue = {
    pokemons,
    setPokemons,
    loading,
    setLoading
}

  return (
    <APIContext.Provider
      value={{
        providerValue
      }}
    >
      {children}
    </APIContext.Provider>
  );
}

export function useAPI() {
  const context = useContext(APIContext).providerValue;
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
