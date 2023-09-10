import Logo from '../logo/logo';
import { FooterContainer } from './footer.styles';

const Footer = () => {
  return (
    <FooterContainer>
      <div>
        <Logo />
        <p>©{new Date().getFullYear()} Driver Log. All rights reserved.</p>
      </div>
    </FooterContainer>
  );
};

export default Footer;
