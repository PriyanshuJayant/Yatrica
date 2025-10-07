import React from "react";
import { motion } from "framer-motion";
import { BannerComp } from "../../components/ui/BannerComp";
import styles from "./Family.module.css";
import NavBar from "../../components/NavBar/NavBar";
import Hero from "../../components/Hero/Hero";
import ExpandableCard from "../../components/ui/Packages";
import BannerVideo from "../../components/BannerVideo/BannerVideo";
import CardCouresel from "../../components/CardCarousel/CardCouresel";
import QuoteForm from "../../components/QuoteForm/QuoteForm";
import CarouselComp from "../../components/Carousel/CarouselComp";
import Diwali from "/videos/DiwaliOffers.mp4";
import Corporate from "/videos/CorporateTours.mp4"

function FamilyPage() {
  return (
    <>
      <div>
        <NavBar />
        <Hero />
        <div className={styles.pageContainer}>
          {/* <CarouselComp /> */}
          <video
            className={styles.diwaliBanner}
            src={Family}
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
              <motion.div className={styles.BannerVideo}>
                <BannerVideo />
              </motion.div>
              <div className={styles.ExpandableCard}>
                <ExpandableCard />
              </div>
            </div>
          </div>

          <div className={styles.HomeContainer}>
            <div>
              {/* <motion.div className={styles.BannerVideo}>
                <BannerVideo />
              </motion.div> */}
              <BannerComp
                src={Corporate}
                heading="Corporate Tours"
                subHeading="Enjoy your best time with your Company"
                buttonText="More Corporate Packages →"
                
              />

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

export default FamilyPage;
