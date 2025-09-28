import React from 'react'
import styles from './Hero.module.css'

function Hero() {
  return (
    <>
      <div className={styles.videoContainer}>
        <video 
          className={styles.video}
          src=""
          autoPlay
          muted
          loop
          playsInline
        >
          Your browser does not support the video tag.
        </video>
        
        <div className={styles.overlay}>
          <h1 className={styles.title}>Hero Title</h1>
          <p className={styles.subtitle}>Your compelling subtitle goes here</p>
        </div>
      </div>
    </>
  )
}

export default Hero