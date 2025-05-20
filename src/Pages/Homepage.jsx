import About from "../components/About";
import FAQ from "../components/FAQ";
import Hero from "../components/Hero";
import HIW from "../components/HIW";
import OurDevices from "../components/OurDevices";
// import Preview from "../components/Preview";
import ClientReview from "../components/ClientReview";

function Homepage() {
  const xml = (
    <>
      <Hero />
      <About />
      <HIW />
      <OurDevices />
      {/* <Preview /> */}
      <ClientReview />

      <FAQ />
    </>
  );
  return xml;
}

export default Homepage;
