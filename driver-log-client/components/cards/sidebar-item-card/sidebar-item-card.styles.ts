import getRemValue from '@/utils/getRemValue';
import styled from 'styled-components';

export interface ISidebarItemStyleProps {
  active?: boolean;
}

export const SidebarItemContainer = styled.div<ISidebarItemStyleProps>`
  width: 100%;
  padding: ${getRemValue(10)} 1rem;
  margin-bottom: ${getRemValue(10)};
  border-radius: 5px;
  display: flex;
  gap: 1rem;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: rgb(var(--color-primary), 0.09);
  }

  ${({ active }) =>
    active &&
    `
      background-color: rgb(var(--color-primary), 0.09);
      
      @media screen and (max-width: 62.5em) {
         transform: scale(1.2);
         border-radius: 50%;
         position: relative;
         top: -5px;
      }
      `}

  & > svg {
    width: ${getRemValue(20)};
    height: ${getRemValue(20)};
    fill: rgb(var(--color-primary));

    @media screen and (max-width: 62.5em) {
      width: ${getRemValue(30)};
      height: ${getRemValue(30)};
    }
  }

  & > p {
    text-align: left;
    font-weight: 700;
    font-size: ${getRemValue(12)};

    @media screen and (max-width: 62.5em) {
      display: none;
    }
  }
`;
