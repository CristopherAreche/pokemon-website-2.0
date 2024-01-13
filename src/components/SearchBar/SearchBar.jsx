import React from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName, getAllPokemon } from "../../app/actions";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    if (event.target.value === "") {
      dispatch(getAllPokemon());
    }
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    dispatch(getPokemonByName(event));
  };

  const handleKeyPress = () => {
    if (searchTerm.length !== 0) {
      handleSearch(searchTerm);
    } else {
      dispatch(getAllPokemon());
    }
  };

  return (
    <div className="flex gap-4">
      <input
        className="rounded-full pl-9 text-black w-[10em] md:w-[20em]"
        placeholder="Type..."
        value={searchTerm}
        onChange={handleChange}
      />
      <button
        className="text-white font-bold bg-green-800 hover:bg-green-600 px-4 py-2 rounded-full"
        onClick={handleKeyPress}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
