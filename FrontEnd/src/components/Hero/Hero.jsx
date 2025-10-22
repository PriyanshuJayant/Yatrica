import React from "react";
import styles from "./Hero.module.css";
import { FlipWords } from "../ui/flipWords";
import { LazyVideo } from "../LazyVideo/LazyVideo";

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
    color: "#4fc3f7",
    fontWeight: "600",
  };

  return (
    <div className={styles.videoContainer}>
      <LazyVideo
        className={styles.video}
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        eager={true}
        rootMargin="0px"
      >
        Your browser does not support the video tag!
      </LazyVideo>

      {showContent && (
        <div className={styles.containerStyle}>
          <div className={styles.textStyle}>
            Discover
            <span style={flipStyle}>
              <FlipWords words={words || defaultWords} />
            </span>
            <br />
            journeys with Yatrica
          </div>
        </div>
      )}
    </div>
  );
}

export default Hero;