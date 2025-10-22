// -------------------- STYLES ------------------------
import styles from "../../pages.module.css";

// -------------------- COMPONENT IMPORTS -------------
import NavBar from "../../../components/NavBar/NavBar";
import Hero from "../../../components/Hero/Hero";
import QuoteForm from "../../../components/QuoteForm/QuoteForm";
import Footer from "../../../components/Footer/Footer";
import ResponsivePackageGrid from "../../../components/SinglePackage/ResponsiveGrid";
import SinglePackage from "../../../components/SinglePackage/SinglePackage";
import { LazySection } from "../../../components/LazySection/LazySection";
import { usePackageData } from "../../../context/DataCacheContext";

// -------------------- VIDEO ASSETS ------------------
const Family = "/videos/FamilyTours.mp4";

// =====================================================
//                     Family Packages
// =====================================================

function FamilyPage() {
  const { data: packagesData, loading } = usePackageData('family');
  
  return (
    <>
      <div className={styles.homePageContainer}>
        {/* -------------------- NAVBAR & HERO -------------------- */}
        <NavBar />

        <div className={styles.FamilyHero} style={{ position: "relative" }}>
          {/* <div className={styles.FamilyHeroVideo}> */}
          <Hero videoSrc={Family} showContent={false} />
          {/* </div> */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "40%",
              height: "100%",
              background:
                "linear-gradient(to right, rgba(0, 0, 0, 0.6), transparent)",
              zIndex: 1,
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "10rem",
              left: "5rem",
              zIndex: 2,
              color: "white",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            <div style={{ fontSize: "35px", fontWeight: "600" }}>
              Family Tours
            </div>
            <div style={{ fontSize: "18px", fontWeight: "400" }}>
              Enjoy your best time with your Family
            </div>
          </div>
        </div>
        {/* <CarouselComp /> */}

        {/* -------------------- Page Content -------------------- */}
        <div className={styles.pageContainer}>
          <LazySection minHeight="600px">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px', fontSize: '18px' }}>
                Loading family packages...
              </div>
            ) : packagesData && packagesData.length > 0 ? (
              <ResponsivePackageGrid>
                {packagesData.map((pkg, index) => (
                  <SinglePackage
                    key={pkg.id || index}
                    src={pkg.src}
                    location={pkg.title || pkg.location}
                    pricing={pkg.description || pkg.pricing}
                    link={pkg.ctaLink}
                  />
                ))}
              </ResponsivePackageGrid>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px', fontSize: '18px' }}>
                No packages available
              </div>
            )}
          </LazySection>

          {/* -------------------- QUOTE FORM -------------------- */}
          <LazySection minHeight="300px">
            <div id="Question" style={{ width: "100%" }}>
              <QuoteForm />
            </div>
          </LazySection>
        </div>

        {/* -------------------- FOOTER -------------------- */}
        <LazySection minHeight="200px">
          <Footer />
        </LazySection>
      </div>
    </>
  );
}

export default FamilyPage;
