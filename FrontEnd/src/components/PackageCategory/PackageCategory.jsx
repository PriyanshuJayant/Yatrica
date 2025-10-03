import React from "react";
import Video from "../../../public/videos/FamilyTours.mp4";

function PackageCategory() {
  return (
    <>
      <video
        src={Video}
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: "100%",
          borderRadius: "15px",
          boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        }}
         type="video/mp4"
         
      >
        <div
          style={{
            paddingLeft: "5rem",
            paddingTop: "5rem",
            fontSize: "35px",
            fontWeight: "600",
            color: "white",
            fontFamily: "Poppins",
          }}
        >
          <div>Family Package</div>
          <div style={{ fontSize: "18px", fontWeight: "400" }}>
            Enjoy your best time with your family
          </div>
        </div>
      </video>
    </>
  );
}

export default PackageCategory;
