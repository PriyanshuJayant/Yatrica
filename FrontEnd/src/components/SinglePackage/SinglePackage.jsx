import React from "react";

const SinglePackage = ({ src, location, pricing, link = "#" }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const SinglePackageStyle = {
    borderRadius: "20px",
  };
  const cardStyle = {
    display: "block",
    borderRadius: "16px",
    overflow: "hidden",
    backgroundColor: "white",
    transition: "all 0.3s ease",
    textDecoration: "none",
    color: "inherit",
  };

  const imageContainerStyle = {
    position: "relative",
    height: "300px",
    overflow: "hidden",
    width: "100%",
    borderRadius: "20px",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    transition: "transform 0.3s ease",
  };

  const detailsContainerStyle = {
    padding:"10px 20px 20px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    backgroundColor: isHovered ? "#f7f7f7ff" : "#ffffffff",
    borderRadius:"20px",
    marginTop:'10px'  
  };

  const locationStyle = {
    fontSize: "18px",
    fontWeight: "500",
    color: "#1f2937",
    margin: "0",
  };

  const pricingStyle = {
    fontSize: "19px",
    fontWeight: "600",
    color: "#111827",
    margin: "0",
  };

  const buttonStyle = {
    backgroundColor: isHovered ? "#c8eeff6b" : "white",
    color: isHovered ? "#2f65bdff" : "#3b82f6",
    padding: "3px",
    width: "110px",
    borderRadius: "20px",
    border: "1px solid gray",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    textAlign: "center",
  };

  return (
    <>
      <div style={SinglePackageStyle}>
        <a
          href={link}
          style={cardStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div style={imageContainerStyle}>
            <img src={src} alt={location} style={imageStyle} />
          </div>
          <div style={detailsContainerStyle}>
            <h3 style={locationStyle}>{location}</h3>
            <p style={pricingStyle}>₹{pricing}</p>
            <button style={buttonStyle}>View Details</button>
          </div>
        </a>
      </div>
    </>
  );
};

export default SinglePackage;
