import React from "react";
import Styles from './Carousel.module.css'
import { Carousel, Image } from "../ui/Carousel";

function CarouselComp() {
  return (
    <>
      <Carousel
        className={Styles.CarouselContainer}
        autoScroll={true}
        autoScrollInterval={4000}
        showControls={true}
        infinite={true}
        height="500px"
        width="100%"
        maxWidth="100vw"
        animationTransition="spring"
>
        <Image src="https://picsum.photos/800/400?random=1" alt="Description" />
        <Image src="https://picsum.photos/800/400?random=2" alt="Description" />
        <Image src="https://picsum.photos/800/400?random=3" alt="Description" />
        <Image src="https://picsum.photos/800/400?random=4" alt="Description" />
      </Carousel>
    </>
  );  
}

export default CarouselComp;


// Animation Speed ko change to AnimationTransition