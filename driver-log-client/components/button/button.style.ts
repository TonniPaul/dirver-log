import getRemValue from '@/utils/getRemValue';
import Link from 'next/link';
import styled from 'styled-components';

export interface IBtnStyleSProps {
  primary?: boolean;
  isBlock?: boolean;
}

export const BtnStyle = styled.button <IBtnStyleSProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: rgb(var(--color-white));
  border: 2px solid rgb(var(--color-primary));
  color: rgb(var(--color-black));
  padding: ${getRemValue(12)} ${getRemValue(18)};
  border-radius: 5px;
  transition-property: background, color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  font-weight: 600;

  ${({ primary }) =>
    primary &&
    `
    background: rgb(var(--color-primary));
    color: rgb(var(--color-white));
  `}

  ${({ isBlock }) =>
    isBlock &&
    `
    display: block;
  `}
`;

export const LinkBtn = styled(Link) <IBtnStyleSProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: rgb(var(--color-white));
  border: 2px solid rgb(var(--color-primary));
  color: rgb(var(--color-black));
  padding: ${getRemValue(12)} ${getRemValue(18)};
  border-radius: 5px;
  transition-property: background, color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  font-weight: 600;

  ${({ primary }) =>
    primary &&
    `
    background: rgb(var(--color-primary));
    color: rgb(var(--color-white));
  `}

   ${({ isBlock }) =>
    isBlock &&
    `
    display: block;
  `}
`;
