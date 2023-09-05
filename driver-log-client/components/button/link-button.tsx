import { LinkBtn } from './button.style';
import { IButtonProp } from './button';

interface LinkButtonProp extends IButtonProp {
   href: string;
   onClick?: () => void;
}

const LinkButton = ({ primary, children, href, isBlock, onClick }: LinkButtonProp) => {

   return (
      <LinkBtn href={href} primary={primary} isBlock={isBlock} onClick={onClick}>
         {children}
      </LinkBtn>
   );
};

export default LinkButton;
