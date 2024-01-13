import styles from "./LandingPage.module.css";
import { image } from "../../images/index.js";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img className={styles.img1} src={image.image1} alt="something" />
        </div>
        <div className={styles.textContainer}>
          <img className={styles.img2} src={image.image2} alt="something" />
          <p>
            Welcome to my new page for viewing and creating Pokemon! This page
            has been created especially for Pokemon enthusiasts who want to
            explore the fascinating world of Pokemon and create their own pocket
            monsters.
          </p>
          <Link to="/home">
            <button className={styles.button}>Go Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
