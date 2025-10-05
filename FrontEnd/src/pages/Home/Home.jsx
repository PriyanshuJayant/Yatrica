import React from "react";
import { motion } from "framer-motion";
import styles from "./Home.module.css";
import NavBar from "../../components/NavBar/NavBar";
import Hero from "../../components/Hero/Hero";
import ExpandableCard from "../../components/ui/Packages";
import PackageCategory from "../../components/PackageCategory/PackageCategory";
import CardCouresel from "../../components/CardCarousel/CardCouresel";
import QuoteForm from "../../components/QuoteForm/QuoteForm";
import CarouselComp from "../../components/Carousel/CarouselComp";

function Home() {
  return (
    <>
      <div>
        <NavBar />
        <Hero />
        <div className={styles.pageContainer}>
          {/* <CarouselComp /> */}

          <div className={styles.HomeContainer}>
            <div>
              <h1>Explore Places</h1>
              <motion.div className={styles.PackageCategory}>
                <PackageCategory />
              </motion.div>
              <div className={styles.ExpandableCard}>
                <ExpandableCard />
              </div>
            </div>
          </div>


          
          <div className={styles.HomeContainer}>
            <div>
              <h1>Explore Places</h1>
              <motion.div className={styles.PackageCategory}>
                <PackageCategory />
              </motion.div>
              <div className={styles.ExpandableCard}>
                <ExpandableCard />
              </div>
            </div>
          </div>
          {/* <CardCouresel/>
              <ExpandableCard/>
              <QuoteForm/> */}
        </div>
      </div>
    </>
  );
}

export default Home;
