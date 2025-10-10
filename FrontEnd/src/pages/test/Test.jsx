import React from "react";
import ResponsivePackageGrid from "../../components/SinglePackage/ResponsiveGrid";
import SinglePackage from "../../components/SinglePackage/SinglePackage";
import packagesData from '../../assets/Packages/FamilyPackages.json'
function Test() {
  return (
    <>
      <div>
        <p style={{color:"black"}}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum
        </p>
        <ResponsivePackageGrid>
          {packagesData.map((pkg) => (
            <SinglePackage
              key={pkg.id}
              src={pkg.src}
              location={pkg.location}
              pricing={pkg.pricing}
              link={pkg.link}
            />
          ))}
        </ResponsivePackageGrid>
      </div>
    </>
  );
}

export default Test;
