import { configureStore } from "@reduxjs/toolkit";
import pokemonsReducer from "./actions";

export const store = configureStore({
  reducer: {
    pokemons: pokemonsReducer,
  },
});
