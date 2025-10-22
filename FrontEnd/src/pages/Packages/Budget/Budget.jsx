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
const Budget  = "/videos/BudgetTour.mp4"

// -------------------- DATA FILES --------------------

// =====================================================
//                     Corporate Packages
// =====================================================

function BudgetPage() {
  const { data: packagesData, loading } = usePackageData('budget');
  return (
    <>
      <div className={styles.homePageContainer}>
        {/* -------------------- NAVBAR & HERO -------------------- */}
        <NavBar />
        <div className={styles.FamilyHero} style={{ position: "relative" }}>
          <Hero videoSrc={Budget} showContent={false} />
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
              Budget Tours
            </div>
            <div style={{ fontSize: "18px", fontWeight: "400" }}>
              Enjoy your best time with your Family and Friends
            </div>
          </div>
        </div>
        {/* <CarouselComp /> */}

        {/* -------------------- Page Content -------------------- */}
        <div className={styles.pageContainer}>
          <LazySection minHeight="600px">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px', fontSize: '18px' }}>
                Loading budget packages...
              </div>
            ) : packagesData && packagesData.length > 0 ? (
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

export default BudgetPage;
