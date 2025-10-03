import React from 'react'
import styles from './Home.module.css'
import NavBar from '../../components/NavBar/NavBar'
import Hero from '../../components/Hero/Hero'
import CarouselComp from '../../components/Carousel/CarouselComp'
import CardCouresel from "../../components/CardCarousel/CardCouresel";
import ExpandableCard from "../../components/ui/Packages";
import QuoteForm from '../../components/QuoteForm/QuoteForm'




function Home() {
  return (
    <>
        <div className={styles.HomeContainer}>
            <NavBar/>
            <Hero/>
            <div className={styles.pageContainer}>
              <CarouselComp/>
              <CardCouresel/>
              <ExpandableCard/>
              <QuoteForm/>
            </div>
        </div>
    </>
  )
}

export default Home