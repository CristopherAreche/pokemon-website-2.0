import { useState, useEffect, useRef } from "react";
import styles from "./Form.module.css";
import { PokemonTypes } from "../../assets/backgroundColorByType";
import { background } from "../../assets/backgroundColorByType.js";
import axios from "axios";
import noImg from "../../images/charmander.png";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Form = () => {
  const initialValues = {
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
    type: [],
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit] = useState(false);
  const [image] = useState(null);
  const fileInputRef = useRef();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    const valor = validate({ ...formValues, [name]: value });
    setFormErrors(valor);
  };

  const validate = (values) => {
    const errors = {};
    const regExpName =
      /^[a-zA-ZÀ-ÖØ-öø-ÿ]+(([',. -][a-zA-ZÀ-ÖØ-öø-ÿ ])?[a-zA-ZÀ-ÖØ-öø-ÿ]*)*$/;
    //Name validation
    if (!values.name) {
      errors.name = "name is required";
    } else if (!regExpName.test(values.name)) {
      errors.name = "the name cannot contain numbers";
    }
    //Hp validation
    if (!values.hp) {
      errors.hp = "hp is required";
    } else if (values.hp < 1) {
      errors.hp = "the hp cannot be less than 1";
    } else if (values.hp > 100) {
      errors.hp = "the hp cannot be more than 100";
    }
    //Attack validation
    if (!values.attack) {
      errors.attack = "attack is required";
    } else if (values.attack < 1) {
      errors.attack = "the attack cannot be less than 1";
    } else if (values.attack > 100) {
      errors.attack = "the attack cannot be more than 100";
    }

    //Defense validation
    if (!values.defense) {
      errors.defense = "defense is required";
    } else if (values.defense < 1) {
      errors.defense = "the defense cannot be less than 1";
    } else if (values.defense > 100) {
      errors.defense = "the defense cannot be more than 100";
    }

    //Speed Validation
    if (!values.speed) {
      errors.speed = "speed is required";
    } else if (values.speed < 1) {
      errors.speed = "the speed cannot be less than 1";
    } else if (values.speed > 100) {
      errors.speed = "the speed cannot be more than 100";
    }

    //Height Validation
    if (!values.height) {
      errors.height = "height is required";
    } else if (values.height < 1) {
      errors.height = "the height cannot be less than 1";
    } else if (values.height > 100) {
      errors.height = "the height cannot be more than 100";
    }

    //Weight Validation
    if (!values.weight) {
      errors.weight = "weight is required";
    } else if (values.weight < 1) {
      errors.weight = "the weight cannot be less than 1";
    } else if (values.weight > 100) {
      errors.weight = "the weight cannot be more than 100";
    }

    //Image Validation
    if (!values.image) {
      errors.image = "You should select an image";
    }
    //Type validation
    if (!values.type.length) {
      errors.types = "You should select at least one type.";
    } else if (values.type.length === 1) {
      errors.types = "";
    } else if (values.type.length > 2) {
      errors.types = "You only can select two types.";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //genera un array con las llaves del objeto fomrErrors
    try {
      if (Object.keys(formErrors).length > 0) {
        swal("Please complete all the fields correctly.");
        return;
      }

      const response = await axios.post(
        "https://pokemon-backend-55wj.onrender.com/pokemons",
        formValues
      );

      if (response.status === 201) {
        swal("Pokemon has been created successfully");
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
      swal("Something has gone wrong 💣💥");
    }
  };

  const handleImageUpload = (e) => {
    setFormValues({
      ...formValues,
      image: e.target.value,
    });
  };

  const handleTypeChange = (e) => {
    var valor;
    const temporalType = e.target.value;
    if (e.target.checked) {
      // Agrega el tipo seleccionado
      setFormValues({
        ...formValues,
        type: [...formValues.type, temporalType],
      });
      valor = validate({
        ...formValues,
        type: [...formValues.type, temporalType],
      });
    } else {
      // Quita el tipo deseleccionado
      let filtrar = formValues.type.filter((t) => t !== temporalType);
      setFormValues({
        ...formValues,
        type: filtrar,
      });
      valor = validate({
        ...formValues,
        type: filtrar,
      });
    }
    setFormErrors(valor);
  };

  useEffect(() => {
    Object.keys(formErrors).length === 0 && isSubmit;
  }, [formErrors, isSubmit]);

  return (
    <div className="flex justify-center pt-28 items-center h-screen lg:h-screen w-screen overflow-x-hidden">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center py-4 items-center w-full mx-3 md:max-w-[35em] bg-gray-400/55 rounded-lg overflow-x-hidden"
      >
        <h1 className="text-2xl w-full font-bold uppercase text-center pb-6">
          Create New Pokemon
        </h1>
        <div className="flex w-full justify-center items-center md:flex-row gap-6 ">
          <div className="w-1/2 flex flex-col items-center">
            <div className={`${formErrors.name ? "pb-0" : "pb-[24px]"}`}>
              <input
                placeholder="NAME"
                type="text"
                name="name"
                className="py-1 rounded-md pl-3 outline-none"
                onChange={handleChange}
                value={formValues.name}
              />
              <p className="text-red-500 bg-blue-400">{formErrors.name}</p>
            </div>

            <div className={`${formErrors.name ? "pb-0" : "pb-[24px]"}`}>
              <input
                placeholder="Hp"
                type="number"
                name="hp"
                className="py-1 rounded-md pl-3 outline-none"
                onChange={handleChange}
                value={formValues.hp}
              />
              <p className="text-red-500">{formErrors.hp}</p>
            </div>
            <div className={`${formErrors.name ? "pb-0" : "pb-[24px]"}`}>
              <input
                placeholder="Attack"
                type="number"
                name="attack"
                className="py-1 rounded-md pl-3 outline-none"
                onChange={handleChange}
                value={formValues.attack}
              />
              <p className="text-red-500">{formErrors.attack}</p>
            </div>

            <div className={`${formErrors.name ? "pb-0" : "pb-[24px]"}`}>
              <input
                placeholder="Defense"
                type="number"
                name="defense"
                className="py-1 rounded-md pl-3 outline-none"
                onChange={handleChange}
                value={formValues.defense}
              />
              <p className="text-red-500">{formErrors.defense}</p>
            </div>
          </div>
          <div className="w-1/2 flex flex-col items-center">
            <div className={`${formErrors.name ? "pb-0" : "pb-[24px]"}`}>
              <input
                placeholder="Speed"
                type="number"
                name="speed"
                className="py-1 rounded-md pl-3 outline-none"
                onChange={handleChange}
                value={formValues.speed}
              />
              <p className="text-red-500">{formErrors.speed}</p>
            </div>

            <div className={`${formErrors.name ? "pb-0" : "pb-[24px]"}`}>
              <input
                placeholder="Height"
                type="number"
                name="height"
                className="py-1 rounded-md pl-3 outline-none"
                onChange={handleChange}
                value={formValues.height}
              />
              <p className="text-red-500">{formErrors.height}</p>
            </div>

            <div className={`${formErrors.name ? "pb-0" : "pb-[24px]"}`}>
              <input
                placeholder="Weight"
                type="number"
                name="weight"
                className="py-1 rounded-md pl-3 outline-none"
                onChange={handleChange}
                value={formValues.weight}
              />
              <p className="text-red-500">{formErrors.weight}</p>
            </div>

            <div className={`${formErrors.name ? "pb-0" : "pb-[24px]"}`}>
              <input
                htmlFor="image"
                type="text"
                name="image"
                placeholder="Insert an Image URL"
                className="py-1 rounded-md pl-3 outline-none"
                onChange={handleImageUpload}
                ref={fileInputRef}
              />
              <p>{formErrors.image}</p>
              {image && (
                <img
                  src={image ? image : noImg}
                  alt="Preview"
                  className={styles.imagePreview}
                />
              )}
            </div>
          </div>
        </div>
        <fieldset className="w-full  items-center justify-center flex flex-col">
          <h2 className="uppercase font-bold mb-5">Select the types:</h2>

          <div className="w-[28em] md:w-[30em] mb-5 flex gap-3 overflow-x-auto scrollbar-hide">
            {PokemonTypes.map((type) => {
              return (
                <div key={type} className="flex gap-2">
                  <input
                    style={{ width: "10px" }}
                    type="checkbox"
                    value={type}
                    name={type}
                    onChange={handleTypeChange}
                  />
                  <label
                    className="py-1 px-3 rounded-xl"
                    htmlFor={type}
                    style={{
                      backgroundColor: `${background[type][0]}`,
                      color: `${background[type][1]}`,
                    }}
                  >
                    {type}
                  </label>
                </div>
              );
            })}
          </div>
          <p>{formErrors.types}</p>
        </fieldset>
        <footer className="flex w-full justify-evenly">
          <button
            type="submit"
            className="ring-2 ring-green-700 px-8 py-2 text-green-700 hover:text-white hover:bg-green-700 rounded-full"
          >
            Create
          </button>
          <button className="ring-2 ring-red-700 px-8 py-2 text-red-700 hover:text-white hover:bg-red-700 rounded-full">
            Cancel
          </button>
        </footer>
      </form>
    </div>
  );
};
export default Form;
