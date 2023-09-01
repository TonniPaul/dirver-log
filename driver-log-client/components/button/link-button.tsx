import { LinkBtn } from './button.style';
import { IButtonProp } from './button';

interface LinkButtonProp extends IButtonProp {
   href: string;
}

const LinkButton = ({ primary, children, href, isBlock }: LinkButtonProp) => {

   return (
      <LinkBtn href={href} primary={primary} isBlock={isBlock}>
         {children}
      </LinkBtn>
   );
};

export default LinkButton;
