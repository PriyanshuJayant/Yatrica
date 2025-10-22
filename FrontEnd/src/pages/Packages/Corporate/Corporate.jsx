// -------------------- STYLES ------------------------
import styles from "../../pages.module.css";

// -------------------- COMPONENT IMPORTS -------------
import NavBar from "../../../components/NavBar/NavBar";
import Hero from "../../../components/Hero/Hero";
import Footer from "../../../components/Footer/Footer";
import ResponsivePackageGrid from "../../../components/SinglePackage/ResponsiveGrid";
import SinglePackage from "../../../components/SinglePackage/SinglePackage";
import QuoteForm from "../../../components/QuoteForm/QuoteForm";
import { LazySection } from "../../../components/LazySection/LazySection";
import { usePackageData } from "../../../context/DataCacheContext";

// --------------------- Dynamic Components -----------

// -------------------- VIDEO ASSETS ------------------
const Corporate = "/videos/CorporateTours.mp4";

// =====================================================
//                     Corporate Packages
// =====================================================

function CorporatePage() {
  const { data: packagesData, loading } = usePackageData('corporate');
  
  return (
    <>
      <div className={styles.homePageContainer}>
        {/* -------------------- NAVBAR & HERO -------------------- */}
        <NavBar />
        <div className={styles.FamilyHero} style={{ position: "relative" }}>
          <Hero videoSrc={Corporate} showContent={false} />
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
              Corporate Tours
            </div>
            <div style={{ fontSize: "18px", fontWeight: "400" }}>
              Enjoy your best time with your Colleagues
            </div>
          </div>
        </div>
        {/* <CarouselComp /> */}

        {/* -------------------- Page Content -------------------- */}
        <div className={styles.pageContainer}>
          <LazySection minHeight="600px">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px', fontSize: '18px' }}>
                Loading corporate packages...
              </div>
            ) : packagesData && packagesData.length > 0 ? (
              <ResponsivePackageGrid>
                {packagesData.map((pkg, index) => (
                  <SinglePackage
                    key={pkg.id || index}
                    src={pkg.src}
                    location={pkg.title}
                    pricing={pkg.description}
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


          {/* -------------------- FAMILY TOURS SECTION -------------------- */}
          {/* <div className={styles.HomeContainer}>
            <BannerComp
              src={Family}
              heading="Family Tours"
              subHeading="Enjoy your best time with your Family"
              buttonText="More Family Packages →"
            />
            <div className={styles.ExpandableCard}>
              <Packages src={FamilyJSON} />
            </div>
          </div> */}

          {/* -------------------- QUOTE FORM -------------------- */}
          {/* <QuoteForm /> */}

          {/* -------------------- SERVICES SECTION -------------------- */}
          {/* <Services /> */}

          {/* -------------------- CORPORATE TOURS SECTION -------------------- */}
          {/* <div className={styles.HomeContainer}>
            <BannerComp
              src={Corporate}
              heading="Corporate Tours"
              subHeading="Enjoy your best time with your Company"
              buttonText="More Corporate Packages →"
            />
            <div className={styles.ExpandableCard}>
              <Packages src={CorporateJSON} />
            </div>
          </div> */}

          {/* -------------------- HONEYMOON / BUDGET FRIENDLY SECTION -------------------- */}
          {/* <div className={styles.HomeContainer}>
            <BannerComp
              src={Corporate}
              heading="Honeymoon"
              subHeading="Enjoy your best time with your Partner"
              buttonText="More Honeymoon Packages →"
            />
            <div className={styles.ExpandableCard}>
              <Packages src={budgetFriendlyJSON} />
            </div>
          </div> */}

          {/* -------------------- FAQ SECTION -------------------- */}
          {/* <FAQs /> */}
        </div>

        {/* -------------------- FOOTER -------------------- */}
        <LazySection minHeight="200px">
          <Footer />
        </LazySection>
      </div>
    </>
  );
}

export default CorporatePage;
