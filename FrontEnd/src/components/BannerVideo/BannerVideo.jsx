import React from "react";
import Video from "../../../public/videos/FamilyTours.mp4";

function BannerVideo() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        borderRadius: "15px",
        overflow: "hidden", // keeps corners rounded
      }}
    >
      {/* Video background */}
      <video
        src={Video}
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
        type="video/mp4"
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "60%",
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)",
          zIndex: 1,
        }}
      ></div>
            <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "40%", // adjust this to control how far it fades horizontally
          height: "100%",
          background:
            "linear-gradient(to right, rgba(0, 0, 0, 0.47) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)",
          zIndex: 1,
        }}
      ></div>

      {/* Text overlay */}
      <div
        style={{
          position: "absolute",
          bottom: "14rem",
          left: "5rem",
          zIndex: 2,
          color: "white",
          fontFamily: "Poppins",
        }}
      >
        <div style={{ fontSize: "35px", fontWeight: "600" }}>Family Package</div>
        <div style={{ fontSize: "18px", fontWeight: "400" }}>
          Enjoy your best time with your family
        </div>
      </div>

      <button
        style={{
          position: "absolute",
          bottom:"9rem",
          left:"5rem",
          transform: "translateY(-50%)",
          zIndex: 2,
          padding: "0.6rem 1.2rem",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          border: "1px solid rgba(255,255,255,0.4)",
          borderRadius: "25px",
          color: "white",
          fontSize: "14px",
          fontWeight: "500",
          cursor: "pointer",
          backdropFilter: "blur(8px)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "rgba(255,255,255,0.3)";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "rgba(255,255,255,0.15)";
        }}
      >
        More Family Packages →
      </button>

    </div>
  );
}

export default BannerVideo;
