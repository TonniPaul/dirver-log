import styled from 'styled-components';
import { List } from '@radix-ui/react-tabs';

export const AuthContainer = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 2rem 1rem;
  gap: 4rem;

  align-items: center;

  @media screen and (min-width: 56.25em) {
    display: flex;
    justify-content: center;
    padding: 2rem;
    padding-top: 4rem;

    & > div {
      flex-basis: 45%;
    }
  }
`;

export const TabList = styled(List)`
  display: flex;
  justify-content: center;
  text-align: center;
  gap: 2rem;
  margin-bottom: 2rem;

  & > * {
    padding: 1rem;
    border: 2px solid;
    color: rgb(var(--color-primary));
    border-color: currentColor;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
  }

  & > *:nth-of-type(2) {
    color: rgb(var(--color-secondary-b));
  }
`;

export const AuthPageImageContainer = styled.div`
  position: relative;
  aspect-ratio: 7/5;

  @media screen and (min-width: 56.25em) {
    aspect-ratio: 1;
  }

  & > img {
    object-fit: contain;
  }
`;
