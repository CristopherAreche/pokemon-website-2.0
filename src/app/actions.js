import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import swal from "sweetalert";

const API_URL = "https://pokemon-backend-55wj.onrender.com";

// Acción asincrónica para obtener todos los pokemons
export const getAllPokemon = createAsyncThunk(
  "pokemon/getAllPokemon",
  async () => {
    const apiData = await axios.get(`${API_URL}/pokemons`);
    return apiData.data;
  }
);

// Acción asincrónica para obtener un pokemon por ID
export const getPokemon = createAsyncThunk("pokemon/getPokemon", async (id) => {
  const apiData = await axios.get(`${API_URL}/pokemons/${id}`);
  return apiData.data;
});

// Acción asincrónica para obtener los tipos de pokemon
export const getTypes = createAsyncThunk("pokemon/getTypes", async () => {
  const apiDataTypes = await axios.get(`${API_URL}/types`);
  return apiDataTypes.data;
});

// Acción asincrónica para filtrar pokemons por tipo
export const getFilterType = createAsyncThunk(
  "pokemon/getFilterType",
  async (type) => {
    const apiDataTypes = await axios.get(`${API_URL}/pokemons`);
    const data = apiDataTypes.data;
    const response = data?.filter((e) => e.type?.includes(type));

    if (response) {
      return response;
    } else {
      alert("This Pokemon type is not on the list");
      return data;
    }
  }
);

// Acción asincrónica para obtener pokemons filtrados por nombre
export const getPokemonByName = createAsyncThunk(
  "pokemon/getPokemonByName",
  async (name) => {
    try {
      const response = await axios.get(`${API_URL}/pokemons`);
      const apiDataTypes = response.data;
      const pokeFilter = apiDataTypes.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      if (!pokeFilter.length) {
        swal("Pokemon not found");
      } else {
        return { pokeFilter, length: pokeFilter.length };
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

// Slice que contiene las acciones y el reducer
const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    pokemons: [],
    pokemon: {},
    types: [],
    length: 0,
  },
  reducers: {
    setFilteredPokemons: (state, action) => {
      state.pokemons = action.payload;
    },
    damageOrder: (state, action) => {
      const { payload: damageOrder } = action;

      let orderDamage;

      if (damageOrder === "max") {
        orderDamage = state.pokemons.slice().sort((a, b) => b.attack - a.attack);
      } else if (damageOrder === "min") {
        orderDamage = state.pokemons.slice().sort((a, b) => a.attack - b.attack);
      } else if (damageOrder === "default") {
        orderDamage = state.pokemons.slice().sort((a, b) => a.pokemonId - b.pokemonId);
      }

      return {
        ...state,
        pokemons: orderDamage,
      };
    },

    pokemonOrder: (state, action) => {
      const { payload: order } = action;

      let pokeOrder;

      if (order === "asc") {
        pokeOrder = state.pokemons.slice().sort((a, b) => a.name.localeCompare(b.name));
      } else if (order === "desc") {
        pokeOrder = state.pokemons.slice().sort((a, b) => b.name.localeCompare(a.name));
      } else if (order === "default") {
        pokeOrder = state.pokemons.slice().sort((a, b) => a.pokemonId - b.pokemonId);
      }

      return {
        ...state,
        pokemons: pokeOrder,
      };
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPokemon.fulfilled, (state, action) => {
        state.pokemons = action.payload;
      })
      .addCase(getPokemon.fulfilled, (state, action) => {
        state.pokemon = { ...state.pokemon, ...action.payload };
      })
      .addCase(getFilterType.fulfilled, (state, action) => {
        state.pokemons = action.payload;
      })
      .addCase(getTypes.fulfilled, (state, action) => {
        state.types = action.payload;
      })
      .addCase(getPokemonByName.fulfilled, (state, action) => {
        state.pokemons = action.payload.pokeFilter;
        state.length = action.payload.length;
      });
  },
});

export const { setFilteredPokemons, damageOrder, pokemonOrder } =
  pokemonSlice.actions;

export default pokemonSlice.reducer;
