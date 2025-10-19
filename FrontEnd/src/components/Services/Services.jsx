import { Camera, Shuffle, Leaf } from "lucide-react";

const serviceList = [
  {
    icon: <Leaf size={30} color="#2563eb" />,
    title: "Flights",
    description:
      "Unbeatable airfares from top airlines worldwide. Whether it's a quick escape or a long journey, we deliver the best routes, lowest prices, and smooth bookings with 24/7 support.",
  },
  {
    icon: <Shuffle size={30} color="#2563eb" />,
    title: "Hotels",
    description:
      "From cozy retreats to luxury resorts, our verified hotel partners offer comfort that matches your style. Beach escapes, city breaks, or mountain getaways — your perfect stay awaits.",
  },
  {
    icon: <Camera size={30} color="#2563eb" />,
    title: "Packages",
    description:
      "Custom itineraries that blend adventure, comfort, and culture. Explore Thailand, Switzerland, Dubai, and beyond. Flights, hotels, tours, transfers — we handle it all so you make memories.",
  },
];

const ServiceItem = ({ service }) => (
  <div
    style={{
      backgroundColor: "white",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      borderRadius: "16px",
      padding: "24px",
      paddingBottom: "48px",
      height: "100%",
      position: "relative",
      color: "#0f172a",
    }}
  >
    <div
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        fontSize: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "-64px",
        backgroundColor: "white",
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        color: "#2563eb",
        position:"absolute",
        top:"40px"
      }}
    >
      {service.icon}
    </div>

    <div style={{ marginTop: "24px" }}>
      <h4
        style={{
          fontSize: "24px",
          fontWeight: "500",
          marginBottom: "16px",
        }}
      >
        {service.title}
      </h4>
      <p style={{ opacity: 0.8, lineHeight: "1.6" }}>{service.description}</p>
    </div>
  </div>
);

const Service9 = () => {
  return (
    <section
      style={{
        paddingTop: "56px",
        paddingBottom: "96px",
        backgroundColor: "white",
        color: "#0f172a",
        position: "relative",
        zIndex: 1,
        overflow: "hidden",
        width:"100%",
        borderRadius:"20px",
        paddingLeft:"35px",
        paddingRight:"35px",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px"
      }}
    >
      <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto", padding: "0 16px" }}>
        {/* Background Shape */}

        {/* Heading Section */}
        <div style={{ width: "100%",  marginBottom: "48px" , display:"flex", flexDirection:"column", textAlign:"center"}}>
          <h2
            style={{
              fontSize: "30px",
              fontWeight: "600",
              lineHeight: "1.1",
              marginBottom: "16px",
              fontFamily:"Poppins"
            }}
          >
            Services We Have
          </h2>
          <p style={{ fontSize: "17px", opacity: 0.8, marginBottom: "24px", lineHeight: "1.6" , fontFamily:"Poppins"}}>
            Experience seamless travel planning with Yatrica. From flights to full packages, we handle every detail so you can focus on the journey ahead.
          </p>
        </div>

        {/* Grid Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            marginTop: "80px",
          }}
        >
          {serviceList.map((service, i) => (
            <div key={i}>
              <ServiceItem service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service9;
