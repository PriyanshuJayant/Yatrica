import React from "react";
import styles from "./Hero.module.css";
import { FlipWords } from "../ui/flipWords";

function Hero({ videoSrc, words, showContent = true }) {
  const defaultWords = [
    "adventurous",
    "romantic",
    "family friendly",
    "budget perfect",
    "luxurious",
    "unforgettable",
  ];

  const flipStyle = {
    display: "inline-block",
    margin: "0 0.4rem",
    color: "#a2eaf7ff",
    fontWeight: "600",
  };

  return (
    <div className={styles.videoContainer}>
      <video
        className={styles.video}
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
      >
        Your browser does not support the video tag!
      </video>

      {showContent && (
        <div className={styles.containerStyle}>
          <div className={styles.textStyle}>
            Discover
            <span style={flipStyle}>
              <FlipWords words={words || defaultWords} />
            </span>
            <br />
            journeys with Yatrica Travels
          </div>
        </div>
      )}
    </div>
  );
}

export default Hero;
