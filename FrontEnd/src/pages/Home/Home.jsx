import React from 'react'
import styles from './Home.module.css'
import NavBar from '../../components/NavBar/NavBar'
import Hero from '../../components/Hero/Hero'
import CarouselComp from '../../components/Carousel/CarouselComp'
import CardCouresel from "../../components/CardCarousel/CardCouresel";



function Home() {
  return (
    <>
        <div className={styles.HomeContainer}>
            <NavBar/>
            <Hero/>
            <div className={styles.pageContainer}>
              <CarouselComp/>
              <CardCouresel/>

              
            </div>
        </div>
    </>
  )
}

export default Home