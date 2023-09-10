import { LogoContainer } from './logo.styles';
import SvgIcon from '../svg-icon/svg-icon';

const Logo = () => {
  return (
    <LogoContainer href="/">
      <SvgIcon name="driver" />
      <p>Driver Log</p>
    </LogoContainer>
  );
};

export default Logo;
