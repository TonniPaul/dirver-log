import { ReactNode } from 'react';
import { BtnStyle, IBtnStyleSProps } from './button.style';

export interface IButtonProp extends IBtnStyleSProps {
   children: ReactNode;
}

const Button = ({ primary, children, }: IButtonProp) => {

   return (
      <BtnStyle primary={primary}>
         {children}
      </BtnStyle>
   );
};

export default Button;
