import React from "react";
import { useAPI } from "../apiContext";
import { Link } from "react-router-dom";

export default function Pokemons() {
  const { pokemons, loading } = useAPI();

  if (loading)
    return (
      <img
        src={process.env.PUBLIC_URL + "logo.svg"}
        className="loader"
        alt="loader-icon"
      />
    );

  return (
    <div className="pokemon-container">
      {pokemons.results?.map((item, slug) => (
        <Link key={item.url} className="item-link" to={`pokemon/${item.name}`}>
          <div className="pokemon-single-item">
            <img
              alt={`${item.name}-img`}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                slug + 1
              }.png`}
              className="item-image"
            />
            <p className="item-name">{item.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
