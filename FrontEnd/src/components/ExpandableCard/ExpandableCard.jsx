// import React from "react";
// import ExpandableCard from "../ui/Packages";

// // If you need to add custom content rendering, transform the data:
// const cardsWithContent = cardsData.map(card => ({
//   ...card,
//   content: () => (
//     <p>
//       {card.content.split('\n\n').map((paragraph, idx) => (
//         <React.Fragment key={idx}>
//           {paragraph}
//           {idx < card.content.split('\n\n').length - 1 && <><br /><br /></>}
//         </React.Fragment>
//       ))}
//     </p>
//   )
// }));

// export default function App() {
//   return (
//     <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 py-20">
//       <ExpandableCard cards={cardsWithContent} />
//     </div>
//   );
// }