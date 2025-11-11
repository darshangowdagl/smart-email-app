import "./Hero.css";
import { HeroImage } from "./HeroImage";
import HeroContent from "./HeroContent";

export default function Hero() {
  return (
    <>
      <div className="hero">
        <HeroContent/>
        <HeroImage />
      </div>
    </>
  );
}
