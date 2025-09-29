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
          <h1 className={styles.title}>Video Section</h1>
          <p className={styles.subtitle}>bla bla bla bla</p>
        </div>
      </div>
    </>
  )
}

export default Hero