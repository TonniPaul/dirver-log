import { ReactNode } from 'react';
import { BtnStyle, IBtnStyleSProps } from './button.style';

export interface IButtonProp extends IBtnStyleSProps {
   children: ReactNode;
}

const Button = ({ primary, children, isBlock }: IButtonProp) => {

   return (
      <BtnStyle primary={primary} isBlock={isBlock}>
         {children}
      </BtnStyle>
   );
};

export default Button;
