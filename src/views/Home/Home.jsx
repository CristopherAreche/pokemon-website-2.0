import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemon } from "../../app/actions";
import Card from "../../components/Card/Card";
import Filter from "../../components/Filter/Filter";
import Pagination from "../../components/Pagination/Pagination";
import SearchBar from "../../components/SearchBar/SearchBar";
import Spinner from "../../components/Spinner/Spinner";

const Home = () => {
  const { pokemons, length } = useSelector((state) => state?.pokemons);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getAllPokemon()).then(() => {
        setIsLoading(false);
      });
    }, 1000);
  }, [dispatch]);

  useEffect(() => {
    if (length !== 0) {
      setPage(1);
    }
  }, [length]);

  return (
    <div className="flex justify-center pt-20 items-start h-screen w-screen overflow-x-hidden">
      <div className="flex flex-col w-full h-full lg:max-w-[1000px]">
        <div className="flex flex-col py-6 justify-start items-center gap-6 text-white">
          <SearchBar />
          <Filter />
          <Pagination
            page={page}
            setPage={setPage}
            pokemons={pokemons}
            length={length}
            perPage={perPage}
          />
        </div>
        <main className="w-full items-start justify-center lg:max-w-[1000px] overflow-y-auto flex scrollbar-hide">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {Array.isArray(pokemons) ? (
                <>
                  <section className="flex justify-center items-center flex-wrap gap-y-6 gap-x-3 w-full">
                    {pokemons
                      ?.slice(
                        (page - 1) * perPage,
                        (page - 1) * perPage + perPage
                      )
                      .map((pokemon, pos) => {
                        return (
                          <Card
                            key={pos}
                            name={pokemon?.name}
                            image={pokemon?.image}
                            pokemonId={pokemon?.pokemonId}
                            type={pokemon?.type}
                          />
                        );
                      })}
                  </section>
                </>
              ) : (
                <div>There are no pokemons available.</div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
