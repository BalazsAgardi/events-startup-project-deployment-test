import styles from "./HomePage.module.css";

function HomePage() {
  return (
    <div className={styles.homePage}>
      <h1>Welcome to the HackYourFuture Event!</h1>
      <img
        src="../public/images/hyf-team34-aar.jpeg"
        alt="Group photo of HackYourFuture team 34 Aarhus"
        className={styles.img}
      />
    </div>
  );
}

export default HomePage;
