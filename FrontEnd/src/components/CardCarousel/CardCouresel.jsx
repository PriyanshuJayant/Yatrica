import React from "react";
import { Image, InfiniteCarousel } from "../ui/CardCarousel";
import CardCarousel from "../ui/CardCarousel";

function CardCouresel() {
  return (
    <>
      <InfiniteCarousel
        autoScroll={true}
        autoScrollInterval={1000}
        showControls={true}
        height="370px"
        width="100%"
        // maxWidth="1000px"
        animationTransition="smooth"
        imagesShown={4}
        innerImageHeight="350px"
        gap="20px"
      >
        <Image
          src="https://images.unsplash.com/photo-1528164344705-47542687000d?w=600"
          alt="Japan"
          title="Japan"
        />
        <Image
          src="https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=600"
          alt="Paris"
          title="Paris"
        />
        <Image
          src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600"
          alt="Maldives"
          title="Maldives"
        />
        <Image
          src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600"
          alt="Dubai"
          title="Dubai"
        />
        <Image
          src="https://images.unsplash.com/photo-1490642914619-7955a3fd483c?w=600"
          alt="Mumbai"
          title="Mumbai"
        />
      </InfiniteCarousel>
    </>
  );
}

export default CardCouresel;
