import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<{ type: { name: string } }>;
  cries?: { latest: string; legacy: string };
  sprites: {
    front_default: string;
  };
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
  moves: Array<{
    move: {
      name: string;
    };
  }>;
}

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<{ results: Pokemon[] }, void>({
      query: () => "pokemon",
    }),
    getPokemonDetails: builder.query<PokemonDetails, number>({
      query: (id) => `pokemon/${id}`,
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonDetailsQuery } = pokemonApi;
