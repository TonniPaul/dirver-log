import Image from 'next/image';
import {
  HeroDescriptionContainer,
  HeroImageContainer,
  HeroWrapper,
} from './hero.styles';
import LinkButton from '../button/link-button';

const Hero = () => {
  return (
    <HeroWrapper>
      <HeroDescriptionContainer>
        <h1>Fleet management made easy with Driver Log</h1>
        <p>
          Efficiently Track and Manage Your Driver Logs with Driver Log -
          Simplify Compliance, Maximize Efficiency!
        </p>
        <LinkButton href="/sign-up" isBlock primary>
          Get Started
        </LinkButton>
      </HeroDescriptionContainer>
      <HeroImageContainer>
        <Image
          src="/assets/delivery-service.png"
          alt="illustration of a truck"
          fill
        />
      </HeroImageContainer>
    </HeroWrapper>
  );
};

export default Hero;
