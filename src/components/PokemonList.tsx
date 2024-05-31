import React, { useState, useEffect } from 'react';
import { useGetPokemonListQuery } from '../store/pokemonApi';
import { useDispatch } from 'react-redux';
import { setSelectedPokemonUrl } from '../store/pokemonSlice';

const PokemonList: React.FC = () => {
    const dispatch = useDispatch();
    const { data, error, isLoading } = useGetPokemonListQuery();
    const [pokemonImages, setPokemonImages] = useState<Record<string, string>>({});

    useEffect(() => {
      if (data) {
          data.results.forEach((pokemon) => {
              fetch(pokemon.url)
                  .then((response) => response.json())
                  .then((details) => {
                      setPokemonImages((prev) => ({
                          ...prev,
                          [pokemon.name]: details.sprites.front_default,
                      }));
                  });
          });
      }
  }, [data]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error occurred: {error.toString()}</div>;

    return (

        <div className="pokemon-list">
            <h1>Pokemon List</h1>
            <ul>
                {data?.results.map(pokemon => (
                    <li key={pokemon.name}onClick={() => dispatch(setSelectedPokemonUrl(pokemon.url))}>
                       <img src={pokemonImages[pokemon.name]} alt={pokemon.name} style={{ width: '50px', height: '50px' }} />
                        {pokemon.name}
                    </li>
                ))}
            </ul>
        </div>

    );
};



export default PokemonList;