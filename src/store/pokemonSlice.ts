
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<{ type: { name: string } }>;
  sprites: { front_default: string };
  stats: Array<{ base_stat: number; stat: { name: string } }>;
  abilities: Array<{ ability: { name: string } }>;
  moves: Array<{ move: { name: string } }>;
}

interface PokemonState {
  selectedPokemonUrl: string | null;
  pokemonDetails: PokemonDetails | null;
}

const initialState: PokemonState = {
  selectedPokemonUrl: null,
  pokemonDetails: null,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setSelectedPokemonUrl: (state, action: PayloadAction<string>) => {
      state.selectedPokemonUrl = action.payload;
    },
    setPokemonDetails: (state, action: PayloadAction<PokemonDetails>) => {
      state.pokemonDetails = action.payload;
    },
  },
});

export const { setSelectedPokemonUrl, setPokemonDetails } =
  pokemonSlice.actions;
export default pokemonSlice.reducer;
