// -------------------- STYLES ------------------------
import styles from "./Corporate.module.css";

// -------------------- COMPONENT IMPORTS -------------
import NavBar from "../../../components/NavBar/NavBar";
import Hero from "../../../components/Hero/Hero";
import Footer from "../../../components/Footer/Footer";
import ResponsivePackageGrid from "../../../components/SinglePackage/ResponsiveGrid";
import SinglePackage from "../../../components/SinglePackage/SinglePackage";
import QuoteForm from "../../../components/QuoteForm/QuoteForm";

// --------------------- Dynamic Components -----------

// -------------------- VIDEO ASSETS ------------------
const Corporate = "/videos/CorporateTours.mp4";

// -------------------- DATA FILES --------------------
import packagesData from "../../../assets/Packages/CorporatePackages.json";

// =====================================================
//                     Corporate Packages
// =====================================================

function CorporatePage() {
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
        <Footer />
      </div>
    </>
  );
}

export default CorporatePage;
