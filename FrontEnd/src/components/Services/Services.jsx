import { Handshake, Hotel, Plane, PackageCheck } from "lucide-react";

const serviceList = [
  {
    icon: <Plane size={30} color="#2563eb" />,
    title: "Flights",
    description:
      "Unbeatable airfares from top airlines worldwide. Whether it's a quick escape or a long journey, we deliver the best routes, lowest prices, and smooth bookings with 24/7 support.",
  },
  {
    icon: <Hotel size={30} color="#2563eb" />,
    title: "Hotels",
    description:
      "From cozy retreats to luxury resorts, our verified hotel partners offer comfort that matches your style. Beach escapes, city breaks, or mountain getaways — your perfect stay awaits.",
  },
  {
    icon: <PackageCheck size={30} color="#2563eb" />,
    title: "Packages",
    description:
      "Curated travel experiences tailored for families, couples, and explorers. Explore destinations with hassle-free itineraries, expert planning, and unforgettable journeys — all designed to match your preferences and budget.",
  },
  {
    icon: <Handshake size={30} color="#2563eb" />,
    title: "Visa Assistance",
    description:
      "Travel abroad without paperwork stress! Our visa support team guides you through every step — from application to approval. We help with documentation, appointments, and coordination for a smooth, hassle-free visa process.",
  },
];

const ServiceItem = ({ service }) => (
  <div
    style={{
      backgroundColor: "white",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      borderRadius: "16px",
      padding: "24px",
      paddingBottom: "20px",
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
        position: "absolute",
        top: "40px",
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
        paddingBottom: "56px",
        backgroundColor: "white",
        color: "#0f172a",
        position: "relative",
        zIndex: 1,
        overflow: "hidden",
        width: "100%",
        borderRadius: "20px",
        paddingLeft: "35px",
        paddingRight: "35px",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
      }}
    >
      <div
        style={{
          position: "relative",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 16px",
        }}
      >
        {/* Background Shape */}

        {/* Heading Section */}
        <div
          style={{
            width: "100%",
            marginBottom: "15px",
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "30px",
              fontWeight: "600",
              lineHeight: "1.1",
              marginBottom: "16px",
              fontFamily: "Poppins",
            }}
          >
            Services We Provide
          </h2>
          <p
            style={{
              fontSize: "17px",
              opacity: 0.8,
              marginBottom: "24px",
              lineHeight: "1.6",
              fontFamily: "Poppins",
            }}
          ></p>
        </div>

        {/* Flex Section */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "24px",
            justifyContent: "center",
          }}
        >
          {serviceList.map((service, i) => (
            <div
              key={i}
              style={{
                flex: "1 1 calc(50% - 12px)",
                minWidth: "260px",
                maxWidth: "420px",
              }}
            >
              <ServiceItem service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service9;
