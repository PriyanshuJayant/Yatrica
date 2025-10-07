import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./proto.module.css";
import NavBar from "../../components/NavBar/NavBar";
import Hero from "../../components/Hero/Hero";
import CardCouresel from "../../components/CardCarousel/CardCouresel";
// import ExpandableCard from "../../components/ui/Packages";
import BannerVideo from "../../components/BannerVideo/BannerVideo";

function Home() {
  return (
    <>
      <div className={styles.HomeContainer}>
        <div className={styles.pageContainer}>
          <h1>Explore Places</h1>
          <motion.div>
            <BannerVideo />
          </motion.div>
          <div className={styles.ExpandableCard}>
            {/* <ExpandableCard /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
