// export default function Services() {
//   const features = [
//     {
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1.5}
//           stroke="currentColor"
//           style={{ width: "24px", height: "24px" }}
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
//           />
//         </svg>
//       ),
//       title: "Flights",
//       desc: "At Yatrica, we bring you unbeatable airfares from top airlines across the globe. Whether it’s a quick getaway or a long-haul journey, our team ensures you get the best routes, lowest prices, and smooth booking experience every time. With 24/7 support and flexible options, your next flight is just a click away.",
//     },
//     {
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1.5}
//           stroke="currentColor"
//           style={{ width: "24px", height: "24px" }}
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
//           />
//         </svg>
//       ),
//       title: "Hotels",
//       desc: "From cozy stays to five-star luxury resorts, Yatrica partners with trusted hotels to offer you verified, comfortable, and budget-friendly accommodations. Every stay is carefully selected to match your travel style — be it a beach escape, a city break, or a mountain retreat. Relax knowing your comfort is our top priority.",
//     },
//     {
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1.5}
//           stroke="currentColor"
//           style={{ width: "24px", height: "24px" }}
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
//           />
//         </svg>
//       ),
//       title: "Packages",
//       desc: "Discover the world your way with our custom-designed travel packages. We curate itineraries that balance adventure, comfort, and culture — whether you’re exploring Thailand, Switzerland, or Dubai. From flights and stays to local tours and transfers, Yatrica handles every detail so you can focus on making memories.",
//     },
//     {
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1.5}
//           stroke="currentColor"
//           style={{ width: "24px", height: "24px" }}
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
//           />
//         </svg>
//       ),
//       title: "Visa Assistance",
//       desc: "Travel abroad without the paperwork stress! Our dedicated visa support team guides you through every step — from application to approval. We help with documentation, appointments, and embassy coordination to ensure a smooth, hassle-free visa process for your international trips.",
//     },
//   ];

//   return (
//     <section style={{ paddingTop: "3.5rem", paddingBottom: "3.5rem" }}>
//       <div
//         style={{
//           maxWidth: "1280px",
//           margin: "0 auto",
//           padding: "0 1rem",
//           color: "#4B5563",
//         }}
//       >
//         {/* Heading Section */}
//         <div
//           style={{
//             position: "relative",
//             maxWidth: "640px",
//             margin: "0 auto",
//             textAlign: "center",
//           }}
//         >
//           <div style={{ position: "relative", zIndex: 10 }}>
//             <h3
//               style={{
//                 color: "#1F2937",
//                 fontSize: "2.25rem",
//                 fontWeight: "600",
//               }}
//             >
//               Let’s help power your SaaS
//             </h3>
//             <p style={{ marginTop: "0.75rem" }}>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
//               congue, nisl eget molestie varius, enim ex faucibus purus.
//             </p>
//           </div>

//           {/* Background Gradient */}
//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               maxWidth: "320px",
//               margin: "0 auto",
//               height: "11rem",
//               filter: "blur(118px)",
//               background:
//                 "linear-gradient(152.92deg, rgba(192,132,252,0.2) 4.54%, rgba(232,121,249,0.26) 34.2%, rgba(192,132,252,0.1) 77.55%)",
//             }}
//           ></div>
//         </div>

//         {/* Feature Grid */}
//         <div style={{ position: "relative", marginTop: "3rem" }}>
//           <ul
//             style={{
//               display: "grid",
//               gap: "2rem",
//               gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//               listStyle: "none",
//               padding: 0,
//               margin: 0,
//             }}
//           >
//             {features.map((item, idx) => (
//               <li
//                 key={idx}
//                 style={{
//                   backgroundColor: "#fff",
//                   padding: "1rem",
//                   border: "1px solid #E5E7EB",
//                   borderRadius: "0.5rem",
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: "0.75rem",
//                 }}
//               >
//                 <div style={{ color: "#4F46E5", paddingBottom: "0.75rem" }}>
//                   {item.icon}
//                 </div>
//                 <h4
//                   style={{
//                     fontSize: "1.125rem",
//                     color: "#1F2937",
//                     fontWeight: "600",
//                   }}
//                 >
//                   {item.title}
//                 </h4>
//                 <p style={{ margin: 0, fontSize:"14px" }}>{item.desc}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// }





import React from "react";
import { Camera, Shuffle, Leaf } from "lucide-react";

const serviceList = [
  {
    icon: <Leaf size={30} color="#2563eb" />,
    title: "Product Design",
    description:
      "So meat isn't you're appear moving great creeping the living saw female bring there may him evening seed set give.",
  },
  {
    icon: <Shuffle size={30} color="#2563eb" />,
    title: "Content Marketing",
    description:
      "Gathered moveth. Forth saying may, morning divided, light can't night, fowl, lights that deep light have i meat air life.",
  },
  {
    icon: <Camera size={30} color="#2563eb" />,
    title: "Digital Strategy",
    description:
      "You're don't signs moveth open brought heaven moveth fruit, saying moveth. Is god Of divided beast after. Fish were rule.",
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
        // paddingTop:"30px",
        // marginBottom:"30px",
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
            Good void fruitful us unto brought firmament, in upon, spirit rule face. Forth created good let you'll years heaven above.
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
