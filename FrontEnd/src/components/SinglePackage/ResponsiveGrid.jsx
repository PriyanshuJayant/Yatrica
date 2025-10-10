// import React from "react";

// const ResponsivePackageGrid = ({ children }) => {
//   const childrenArray = React.Children.toArray(children);
//   const packageCount = childrenArray.length;
//   const rows = [];
//   for (let i = 0; i < packageCount; i += 4) {
//     rows.push(childrenArray.slice(i, i + 4));
//   }

//   const containerStyle = {
//     width: "100%",
//     maxWidth: "1400px",
//     margin: "0 auto",
//     padding: "40px 20px",
//     border: "2px solid black",
//     backgroundColor: "white",
//   };

//   const gridStyle = {
//     display: "grid",
//     gridTemplateColumns: "repeat(1, 1fr)",
//     gap: "24px",
//     justifyItems: "center",
//   };

//   const lastRowCount = packageCount % 4;
//   const totalRows = Math.ceil(packageCount / 4);

//   return (
//     <div style={containerStyle}>
//       <div style={gridStyle} className="package-grid">
//         {childrenArray.map((child, index) => {
//           const rowNumber = Math.floor(index / 4);
//           const isLastRow = rowNumber === totalRows - 1;
//           const positionInRow = index % 4;

//           const itemWrapperStyle = {
//             width: "100%",
//             maxWidth: "350px",
//           };

//           return (
//             <div
//               key={index}
//               style={itemWrapperStyle}
//               className={`package-item ${isLastRow ? "last-row-item" : ""}`}
//               data-position={positionInRow}
//               data-last-row-count={lastRowCount}
//             >
//               {child}
//             </div>
//           );
//         })}
//       </div>

//       <style>{`
//         @media (min-width: 768px) {
//           .package-grid {
//             grid-template-columns: repeat(2, 1fr) !important;
//           }
//         }
        
//         @media (min-width: 1024px) {
//           .package-grid {
//             grid-template-columns: repeat(3, 1fr) !important;
//           }
//         }
        
//         @media (min-width: 1280px) {
//           .package-grid {
//             grid-template-columns: repeat(4, 1fr) !important;
//           }
          
//           .last-row-item[data-last-row-count="1"][data-position="0"] {
//             grid-column: 2 / span 1;
//           }
          
//           .last-row-item[data-last-row-count="2"][data-position="0"] {
//             grid-column: 2 / span 1;
//           }
          
//           .last-row-item[data-last-row-count="3"][data-position="0"] {
//             grid-column: 1 / span 1;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ResponsivePackageGrid;


import React from "react";

const ResponsivePackageGrid = ({ children }) => {
  const childrenArray = React.Children.toArray(children);
  const packageCount = childrenArray.length;
  const rows = [];
  for (let i = 0; i < packageCount; i += 4) {
    rows.push(childrenArray.slice(i, i + 4));
  }

  const containerStyle = {
    width: "100%",
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "40px 20px",
    backgroundColor: "white",
    borderRadius:"20px",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    gap: "24px",
    justifyItems: "center",
  };

  const totalRows = Math.ceil(packageCount / 4);
  const lastRowCount = packageCount % 4 || 4;

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="package-grid">
        {childrenArray.map((child, index) => {
          const rowNumber = Math.floor(index / 4);
          const isLastRow = rowNumber === totalRows - 1;
          const positionInRow = index % 4;

          return (
            <div
              key={index}
              className={`package-item ${isLastRow ? "last-row-item" : ""}`}
              data-position={positionInRow}
              data-last-row-count={lastRowCount}
            >
              {child}
            </div>
          );
        })}
      </div>

      <style>{`
        /* Base grid structure */
        .package-item {
          width: 100%;
          max-width: 350px;
        }

        @media (min-width: 768px) {
          .package-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (min-width: 1024px) {
          .package-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        @media (min-width: 1280px) {
          .package-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }

          /* ---- SMART LAST ROW ALIGNMENT ---- */
          /* 1 item left → center it under 2nd & 3rd columns */
          .last-row-item[data-last-row-count="1"][data-position="0"] {
            grid-column: 2 / span 2;
            justify-self: center;
          }

          /* 2 items left → center them under 2nd & 3rd columns */
          .last-row-item[data-last-row-count="2"][data-position="0"] {
            grid-column: 2 / span 1;
          }
          .last-row-item[data-last-row-count="2"][data-position="1"] {
            grid-column: 3 / span 1;
          }

          /* 3 items left → naturally align under 1, 2, 3 */
          .last-row-item[data-last-row-count="3"][data-position="0"] {
            grid-column: 1 / span 1;
          }
          .last-row-item[data-last-row-count="3"][data-position="1"] {
            grid-column: 2 / span 1;
          }
          .last-row-item[data-last-row-count="3"][data-position="2"] {
            grid-column: 3 / span 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ResponsivePackageGrid;
