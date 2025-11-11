import "./Hero.css";
import { HeroImage } from "../Landing_page/HeroImage";
import LoginForm from "./LoginForm";

function Hero() {
  return (
    <>
      <div className="hero">
        <LoginForm />
        <HeroImage />
      </div>
    </>
  );
}

export default Hero;
