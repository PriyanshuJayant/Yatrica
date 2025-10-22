// -------------------- STYLES ------------------------
import styles from "../../pages.module.css";

// -------------------- COMPONENT IMPORTS -------------
import NavBar from "../../../components/NavBar/NavBar";
import Hero from "../../../components/Hero/Hero";
import QuoteForm from "../../../components/QuoteForm/QuoteForm";
import Footer from "../../../components/Footer/Footer";
import ResponsivePackageGrid from "../../../components/SinglePackage/ResponsiveGrid";
import SinglePackage from "../../../components/SinglePackage/SinglePackage";

// -------------------- VIDEO ASSETS ------------------
const Budget  = "/videos/BudgetTour.mp4"

// -------------------- DATA FILES --------------------
import packagesData from "../../../assets/Packages/BudgetPackages.json";

// =====================================================
//                     Corporate Packages
// =====================================================

function BudgetPage() {
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

          {/* -------------------- QUOTE FORM -------------------- */}
          <div id="Question" style={{ width: "100%" }}>
            <QuoteForm />
          </div>
        </div>

        {/* -------------------- FOOTER -------------------- */}
        <Footer />
      </div>
    </>
  );
}

export default BudgetPage;
