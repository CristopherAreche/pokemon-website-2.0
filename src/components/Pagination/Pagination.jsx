import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Pagination = ({ page, setPage, pokemons, perPage, length }) => {
  const [input, setInput] = useState(1);
  const max = length === 0 ? pokemons.length / perPage : length / perPage;

  useEffect(() => {
    setInput(1);
  }, [length]);

  const nextPage = () => {
    setInput(parseInt(input) + 1);
    setPage(parseInt(page) + 1);
  };

  const prevPage = () => {
    setInput(parseInt(input) - 1);
    setPage(parseInt(page) - 1);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      setPage(parseInt(e.target.value));
      if (
        parseInt(
          //si el numero es menor a 1, que no siga bajando a numeros negativos
          e.target.value < 1 ||
            parseInt(e.target.value) > Math.ceil(max) ||
            isNaN(parseInt(e.target.value))
        )
      ) {
        setPage(1);
        setInput(1);
      } else {
        setPage(parseInt(e.target.value));
      }
    }
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className="flex justify-center items-center gap-4">
      <button
        disabled={page === 1 || page < 1}
        className="p-4 rounded-full bg-gray-300 text-lg text-gray-700"
        onClick={prevPage}
      >
        <FaArrowLeft />
      </button>
      <div className="flex">
        <input
          className="bg-gray-300 text-gray-700 w-[3em] h-auto text-center text-lg rounded-l-full outline-none border-none"
          onChange={(e) => onChange(e)}
          onKeyDown={(e) => onKeyDown(e)}
          name="page"
          autoComplete="off"
          value={input}
        />
        <p className="bg-gray-300 text-gray-700 text-lg pr-5 rounded-r-full outline-none border-none">
          {" "}
          <span className="mr-3 text-gray-700">of</span> {Math.ceil(max)}
        </p>
      </div>
      <button
        disabled={page === Math.ceil(max) || page > Math.ceil(max)}
        className="p-4 rounded-full bg-gray-300 text-lg text-gray-700"
        onClick={nextPage}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
