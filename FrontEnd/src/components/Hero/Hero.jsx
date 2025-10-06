import React from "react";
import styles from "./Hero.module.css";
import Video from "../../../public/videos/FamilyTours.mp4";
import { FlipWords } from "../ui/flipWords";

function Hero() {
  const words = ["adventurous", "romantic", "family friendly", "budget perfect", "luxurious", "unforgettable"];

  const flipStyle = {
    display: "inline-block",
    margin: "0 0.4rem",
    color: "#a2eaf7ff", // you can tweak for dark mode
    fontWeight: "600",
  };
  return (
    <>
      <div className={styles.videoContainer}>
        <video
          className={styles.video}
          src={Video}
          autoPlay
          muted
          loop
          playsInline
        >
          Your browser does not support the video tag!
        </video>

        <div className={styles.containerStyle}>
          <div className={styles.textStyle}>
            Discover
            <span style={flipStyle}>
              <FlipWords words={words} />
            </span><br/>
            journeys with Yatrica Travels
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
