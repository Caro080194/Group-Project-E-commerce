import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { useEffect } from "react";
import HeroSection from "./HeroSection";
import RotatingSlides from "./RotatingSlides";

// Home / Landing page for the website. 
const Home = () => {
  useEffect(() => {
    document.title = "E-Wear Emporium";
  }, []);
  return (
    <>
      <NavBar />
      <HeroSection />
      <RotatingSlides />
      <Footer />
    </>
  );
};
export default Home;
