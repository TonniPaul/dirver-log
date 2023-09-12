import { ILogoStyleProps, LogoContainer } from './logo.styles';
import SvgIcon from '../svg-icon/svg-icon';

const Logo = ({ isPrimary }: ILogoStyleProps) => {
  return (
    <LogoContainer href="/" isPrimary={isPrimary}>
      <SvgIcon name="driver" />
      <p>Driver Log</p>
    </LogoContainer>
  );
};

export default Logo;
