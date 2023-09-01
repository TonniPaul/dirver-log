import Image from "next/image";
import { HeroDescriptionContainer, HeroImageContainer, HeroWrapper } from "./hero.styles"

const Hero = () => {
   return (
      <HeroWrapper>
         <HeroDescriptionContainer>
            <h1>Driver Log</h1>
            <p>Efficiently Track and Manage Your Driver Logs with Driver Log - Simplify Compliance, Maximize Efficiency!</p>
         </HeroDescriptionContainer>
         <HeroImageContainer>
            <Image src='/assets/delivery-service.png' alt='illustration of a truck' fill />
         </HeroImageContainer>
      </HeroWrapper>
   );
};

export default Hero;