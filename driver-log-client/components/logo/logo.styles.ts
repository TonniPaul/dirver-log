import getRemValue from '@/utils/getRemValue';
import Link from 'next/link';
import styled from 'styled-components';

export interface ILogoStyleProps {
  isPrimary?: boolean;
}

export const LogoContainer = styled(Link)<ILogoStyleProps>`
  display: flex;
  align-items: center;
  z-index: 10;

  ${({ isPrimary }) =>
    isPrimary &&
    `
    color: rgb(var(--color-primary));
  `}

  & > svg {
    fill: currentColor;
    width: ${getRemValue(35)};
    height: ${getRemValue(35)};
  }

  & > p {
    font-size: ${getRemValue(20)};
    font-weight: 700;
  }
`;
