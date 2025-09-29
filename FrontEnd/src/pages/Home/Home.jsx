import React from 'react'
import styles from './Home.module.css'
import NavBar from '../../components/NavBar/NavBar'
import Hero from '../../components/Hero/Hero'

function Home() {
  return (
    <>
        <div className={styles.HomeContainer}>
            <NavBar/>
            <Hero/>
            <div className={styles.pageContainer}>
              


              
            </div>
        </div>
    </>
  )
}

export default Home