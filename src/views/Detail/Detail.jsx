import { useEffect } from "react";
import styles from "./Detail.module.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemon } from "../../app/actions";
import { background, backgroundImg } from "../../assets/backgroundColorByType";

const Detail = () => {
  const dispatch = useDispatch();
  const { pokemon } = useSelector((state) => state.pokemons);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPokemon(id));
  }, [dispatch]);
  if (pokemon) {
    const typeC = pokemon?.type && pokemon.type[0];
    const bgColor = backgroundImg[`${typeC}`];

    return (
      <div className="flex justify-center items-center min-h-[100vh] w-[100vw]">
        <div className="my-auto h-[30em] w-[25em] rounded-xl shadow-md shadow-gray-800 bg-white">
          <div
            className="w-full h-[65%] flex justify-center items-center rounded-t-xl"
            style={{ backgroundColor: `${bgColor}` }}
          >
            <img className={styles.img1} src={pokemon?.image} alt="something" />
          </div>
          <div className="h-[35%] text-gray-800 w-full px-2 mb-10">
            <div className="flex justify-between gap-2 mb-4">
              <h2 className="text-xl font-bold">{pokemon.name}</h2>
              <h2 className="text-xl">
                #
                {pokemon.pokemonId?.length > 5
                  ? pokemon.pokemonId.slice(-3)
                  : pokemon.pokemonId}
              </h2>
            </div>
            <div className="w-full h-[70%] flex">
              <div className="w-1/3 h-full flex flex-col items-start pl-[20px] ">
                <h5>Hp: {pokemon.hp}</h5>
                <h5>Attack: {pokemon.attack}</h5>
                <h5>Defense: {pokemon.defense}</h5>
              </div>
              <div className="w-1/3 h-full flex flex-col items-start pl-[20px] ">
                <h5>Speed: {pokemon.speed}</h5>
                <h5>Height: {pokemon.height}</h5>
                <h5>Weight: {pokemon.weight}</h5>
              </div>
              <div className="flex flex-col gap-2">
                {pokemon?.type &&
                  pokemon.type.map((element, pos) => (
                    <div
                      key={pos}
                      className={styles.tLabel}
                      style={{
                        backgroundColor: `${background[`${element}`][0]}`,
                        color: `${background[`${element}`][1]}`,
                      }}
                    >
                      {element}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <p className={styles.button}>Close</p>
          </Link>
        </div>
      </div>
    );
  }
};

export default Detail;
