import React from "react";
import {Header} from "../../components/Header.jsx";
import {Hero} from "../../components/Hero.jsx";
import {PrimaryFeatures} from "../../components/PrimaryFeatures.jsx";
import {SecondaryFeatures} from "../../components/SecondaryFeatures.jsx";
import {CallToAction} from "../../components/CallToAction.jsx";
import {Testimonials} from "../../components/Testimonials.jsx";
import {Pricing} from "../../components/Pricing.jsx";
import {Faqs} from "../../components/Faqs.jsx";
import {Footer} from "../../components/Footer.jsx";


const Home = (props) => {
  return (
    <>
        <Header />
        <main>
          <Hero />
          <PrimaryFeatures />
          <SecondaryFeatures />
          <CallToAction />
          <Testimonials />
          <Pricing />
          <Faqs />
        </main>
        <Footer />
      </>

  );
};

export default Home;
