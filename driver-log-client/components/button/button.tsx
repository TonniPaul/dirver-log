import { ReactNode } from 'react';
import { BtnStyle, IBtnStyleSProps } from './button.style';

export interface IButtonProp extends IBtnStyleSProps {
  children: ReactNode;
  onClick?: () => void;
}

const Button = ({ primary, children, isBlock, onClick }: IButtonProp) => {
  return (
    <BtnStyle primary={primary} isBlock={isBlock} onClick={onClick}>
      {children}
    </BtnStyle>
  );
};

export default Button;
