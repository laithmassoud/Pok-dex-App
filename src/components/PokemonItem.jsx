import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const PokemonItem = () => {
  const { slug } = useParams();
  const [selectedpokemon, setSelectedpokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${slug}`
      );
      console.log("data", data);
      setSelectedpokemon(data);
      setLoading(false);
    }
    fetchData();
  }, [slug]);

  if (loading)
    return (
      <img
        src={process.env.PUBLIC_URL + "logo.svg"}
        className="loader"
        alt="loader-icon"
      />
    );
  return (
    <div className="card-container">
      <div className="card-content ">
        <h1 className="pokemon-name">{selectedpokemon.name}</h1>
        <img
        alt={`${selectedpokemon.name}-img`}
          src={
            selectedpokemon.sprites?.other["official-artwork"]?.front_default
          }
          className="sprite"
        />

        <table id="description">
          <tbody>
            <tr>
              <th>Weigth</th>
              <th>Heigth</th>
              <th>Base XP</th>
              <th>Types</th>
              <th>Stats</th>
              <th>Abilities</th>
              <th>Moves</th>
            </tr>
            <tr>
              <td>{poundsToKG(selectedpokemon.weight)} kg</td>
              <td>{footToCm(selectedpokemon.height)} M</td>
              <td>{selectedpokemon.base_experience}</td>
              <td>{iterateArray(selectedpokemon.types, "type")}</td>
              <td>{iterateArray(selectedpokemon.stats, "stat")}</td>
              <td>{iterateArray(selectedpokemon.abilities, "ability")}</td>
              <td>{iterateArray(selectedpokemon.moves, "move")}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const iterateArray = (array, key) => {
  const newArray = array?.map((item, index) => {
    if (index + 1 === array.length) {
      return <span key={index}>{item[key].name}</span>;
    }
    return <span key={index}>{item[key].name + ", "}</span>;
  });
  return newArray;
};

export default PokemonItem;

const poundsToKG = (lbs) => {
  return (Number(lbs) / 2.2).toFixed(0);
};

const footToCm = (ft) => {
  return (Number(ft) / 3.2808).toFixed(2);
};
