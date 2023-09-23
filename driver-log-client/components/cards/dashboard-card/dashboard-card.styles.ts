import getRemValue from '@/utils/getRemValue';
import styled from 'styled-components';

export interface IDashboardCardStyleProp {
  isCompleted?: boolean;
  isUnassigned?: boolean;
}

export const DashboardCardWrapper = styled.div<IDashboardCardStyleProp>`
  text-align: center;
  box-shadow: var(--box-shadow);
  border-radius: ${getRemValue(10)};
  background-color: rgb(var(--color-white));
  padding: 2rem 1rem;
  font-weight: 600;
  text-transform: capitalize;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
  width: 50%;

  @media screen and (min-width: 62.5em) {
    max-width: 250px;
  }

  & p:last-of-type {
    color: rgb(var(--color-primary));
    font-size: ${getRemValue(30)};
    margin-top: 1rem;

    ${({ isCompleted }) =>
      isCompleted &&
      `
      color: green;   
   `}

    ${({ isUnassigned }) =>
      isUnassigned &&
      `
      color: rgb(var(--color-error));   
   `}
  }

  &:hover {
    transform: scale(0.9);
  }
`;
