import { useNavigate } from "react-router-dom";

export function BannerComp({
  src,
  heading = "Default Heading",
  subHeading = "Default Subheading",
  buttonText = "Learn More →",
  buttonLink,
  onButtonClick,
  height = "400px",
  overlayBottom = true,
  overlaySide = true,
}) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (buttonLink) {
      // Internal link (starts with '/')
      if (buttonLink.startsWith("/")) {
        navigate(buttonLink);
      } else {
        window.open(buttonLink, "_blank");
      }
    } else if (onButtonClick) {
      onButtonClick();
    }
  };
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height,
        borderRadius: "15px 15px 0 0",
        overflow: "hidden",
      }}
    >
      {/* Video background */}
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          WebkitAppearance: "none",
        }}
        type="video/mp4"
      />

      {/* Gradient Overlays */}
      {overlayBottom && (
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
      )}

      {overlaySide && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "40%",
            height: "100%",
            background:
              "linear-gradient(to right, rgba(0, 0, 0, 0.47) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)",
            zIndex: 1,
          }}
        ></div>
      )}

      {/* Text overlay */}
      <div
        style={{
          position: "absolute",
          bottom: "14rem",
          left: "5rem",
          zIndex: 2,
          color: "white",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <div style={{ fontSize: "35px", fontWeight: "600" }}>{heading}</div>
        <div style={{ fontSize: "18px", fontWeight: "400" }}>{subHeading}</div>
      </div>

      {/* Button */}
      <button
        style={{
          position: "absolute",
          bottom: "9rem",
          left: "5rem",
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
        onClick={handleButtonClick}
        onMouseEnter={(e) =>
          (e.target.style.backgroundColor = "rgba(255,255,255,0.3)")
        }
        onMouseLeave={(e) =>
          (e.target.style.backgroundColor = "rgba(255,255,255,0.15)")
        }
      >
        {buttonText}
      </button>
    </div>
  );
}
