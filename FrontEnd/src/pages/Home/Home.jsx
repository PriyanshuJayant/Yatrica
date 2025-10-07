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
import Diwali from "/videos/DiwaliOffers.mp4";

function Home() {
  return (
    <>
      <div>
        <NavBar />
        <Hero />
        <div className={styles.pageContainer}>
          {/* <CarouselComp /> */}
          <video
            className={styles.diwaliBanner}
            src={Diwali}
            autoPlay
            muted
            loop
            playsInline
          >
            Your Browser does not support this video format
          </video>
          <CardCouresel />

          <div className={styles.HomeContainer}>
            <div>
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
              <motion.div className={styles.PackageCategory}>
                <PackageCategory />
              </motion.div>
              <div className={styles.ExpandableCard}>
                <ExpandableCard />
              </div>
            </div>
          </div>

          <QuoteForm />
        </div>
      </div>
    </>
  );
}

export default Home;
