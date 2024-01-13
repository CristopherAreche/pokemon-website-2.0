import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilterType,
  getAllPokemon,
  getTypes,
  pokemonOrder,
  damageOrder,
} from "../../app/actions.js";

const Filter = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.pokemons);
  const [filter, setFilter] = useState(false);
  const [selectedOption, setSelectedOption] = useState("all");

  const order = useSelector((state) => state.order);

  function handleFilter(e) {
    const value = e.target.value;
    if (value === "all") {
      dispatch(getAllPokemon());
      setFilter(false);
    } else if (value === "type") {
      setFilter(true);
    }
    setSelectedOption(value);
    dispatch(getFilterType(value));
  }

  function clearFilters() {
    dispatch(getAllPokemon());
    setFilter(false);
    setSelectedOption("all");
    const typeSelector = document.querySelector("select:nth-child(2)");
    if (typeSelector) {
      typeSelector.value = "all";
    }
  }

  function handleOrder(event) {
    dispatch(pokemonOrder(event.target.value));
  }
  function handleDamageOrder(event) {
    dispatch(damageOrder(event.target.value));
  }

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getAllPokemon());
  }, [dispatch]);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex gap-4">
        <div className="flex justify-center items-center gap-2">
          <select
            className="appearance-none w-auto px-3 py-2 rounded-full text-gray-700"
            onChange={handleFilter}
            value={selectedOption}
          >
            <option value="all">All Types</option>
            {state.types?.map((type, index) => {
              return (
                <option key={index} value={type}>
                  {type}
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex justify-center items-center gap-2">
          <select
            className="appearance-none w-auto px-3 py-2 rounded-full text-gray-700"
            onChange={handleOrder}
            value={order}
          >
            <option value="default">Alphabetical Order</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4 justify-between">
        <div className="flex justify-center items-center gap-2">
          <select
            className=" appearance-none w-auto px-3 py-2 rounded-full text-gray-700"
            onChange={handleDamageOrder}
            value={order}
          >
            <option value="default">Attack Damage</option>
            <option value="max">Max Damage</option>
            <option value="min">Min Damage</option>
          </select>
        </div>
        <button
          onClick={clearFilters}
          className="py-2 px-4 rounded-full bg-gray-400 hover:bg-gray-600"
        >
          Clear
        </button>
      </div>
    </div>
  );
};
export default Filter;
