import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setPokemonDetails } from "../store/pokemonSlice";

const PokemonDetail: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedPokemonUrl, pokemonDetails } = useSelector(
    (state: RootState) => state.pokemon
  );
  const pokemonIdString = selectedPokemonUrl?.split("/").filter(Boolean).pop();
  const pokemonId = pokemonIdString ? parseInt(pokemonIdString) : null;

  useEffect(() => {
    if (pokemonId) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then((response) => response.json())
        .then((data) => dispatch(setPokemonDetails(data)))
        .catch(console.error);
    }
  }, [dispatch, pokemonId, pokemonDetails]);

  if (!pokemonId) return <div>Please select a Pokémon!</div>;
  if (!pokemonDetails) return <div>Loading...</div>;

  return (
    <div className="pokemon-detail">
      <h1>{pokemonDetails.name}</h1>
      <img
        src={pokemonDetails.sprites.front_default}
        alt={pokemonDetails.name}
      />
      <p>
        <strong>Height:</strong> {pokemonDetails.height}
      </p>
      <p>
        <strong>Weight:</strong> {pokemonDetails.weight}
      </p>
      <div className="section">
        <h2>Types</h2>
        <ul>
          {pokemonDetails.types.map((t) => (
            <li key={t.type.name}>{t.type.name}</li>
          ))}
        </ul>
      </div>
      <div className="section">
        <h2>Abilities</h2>
        <ul>
          {pokemonDetails.abilities.map((a) => (
            <li key={a.ability.name}>{a.ability.name}</li>
          ))}
        </ul>
      </div>
      <div className="section">
        <h2>Stats</h2>
        <ul>
          {pokemonDetails.stats.map((s) => (
            <li key={s.stat.name}>
              {s.stat.name}: {s.base_stat}
            </li>
          ))}
        </ul>
      </div>
      <div className="section">
        <h2>Moves</h2>
        <ul>
          {pokemonDetails.moves.map((m) => (
            <li key={m.move.name}>{m.move.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonDetail;
