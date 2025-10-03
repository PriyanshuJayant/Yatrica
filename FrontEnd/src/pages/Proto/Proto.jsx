import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./proto.module.css";
import NavBar from "../../components/NavBar/NavBar";
import Hero from "../../components/Hero/Hero";
import CardCouresel from "../../components/CardCarousel/CardCouresel";
import ExpandableCard from "../../components/ui/Packages";
import PackageCategory from "../../components/PackageCategory/PackageCategory";

function Home() {
  return (
    <>
      <div className={styles.HomeContainer}>
        <div className={styles.pageContainer}>
          <h1 className="text-blue-600">Explore Places</h1>
          <motion.div
            className={styles.PackageCategory}
          >
            <PackageCategory />
          </motion.div>
          {/* <motion.div className={styles.CardCarousel}>
            <CardCouresel />
          </motion.div> */}
          <ExpandableCard />
        </div>
      </div>
    </>
  );
}

export default Home;
