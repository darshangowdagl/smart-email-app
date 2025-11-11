import "./Hero.css";
import { HeroImage } from "../Landing_page/HeroImage";
import SignupForm from "./SignupForm";

function Hero() {
  return (
    <>
      <div className="hero">
        <SignupForm />
        <HeroImage />
      </div>
    </>
  );
}

export default Hero;
