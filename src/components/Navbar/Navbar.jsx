import { Link } from "react-router-dom";
import { image } from "../../images/index.js";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const Navbar = () => {
  const [home, setHome] = useState(false);

  const handleClick = () => {
    setHome(!home);
  };

  return (
    <div className="bg-[#6a5f94] flex items-center justify-center fixed top-0 w-full">
      <div className="w-full lg:max-w-[1000px] flex justify-between items-center  py-4 px-6 ">
        <img className="h-[3em]" src={image.image2} alt="something" />
        <div className="flex gap-6">
          {home ? (
            <Link
              onClick={handleClick}
              to="/home"
              className="text-white text-xl font-bold hover:text-yellow-300 flex justify-center items-center gap-2"
            >
              <FaArrowLeft />
              <span>Go Back</span>
            </Link>
          ) : (
            <Link
              onClick={handleClick}
              to="/create"
              className="text-white text-xl font-bold hover:text-yellow-300"
            >
              Add New Pokemon
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
