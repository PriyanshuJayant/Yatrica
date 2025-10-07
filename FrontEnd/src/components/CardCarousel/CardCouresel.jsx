import React from "react";
import { Image, InfiniteCarousel } from "../ui/CardCarousel";
import CardCarousel from "../ui/CardCarousel";

function CardCouresel() {
  return (
    <>
      <InfiniteCarousel
        autoScroll={true}
        autoScrollInterval={2000}
        showControls={true}
        height="370px"
        width="90%"
        // maxWidth="1000px"
        animationTransition="smooth"
        imagesShown={4}
        innerImageHeight="340px"
        gap="15px"
      >
        <Image
          src="https://images.unsplash.com/photo-1528164344705-47542687000d?w=600"
          alt="Dubai"
          title="Dubai"
        />
        <Image
          src="https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=600"
          alt="Vietnam"
          title="Vietnam"
        />
        <Image
          src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600"
          alt="Bali"
          title="Bali"
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
