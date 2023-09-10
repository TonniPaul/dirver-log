import getRemValue from '@/utils/getRemValue';
import styled from 'styled-components';

export const ErrorPageContainer = styled.div`
  padding: var(--padding-sm);

  @media screen and (min-width: 56.25em) {
    display: flex;
    align-items: center;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 2rem;

    & > div {
      flex-basis: 50%;
    }

    & > div:first-child {
      padding-right: 3rem;
    }
  }

  & > div > p:last-of-type {
    margin: 3rem 0;
  }
`;

export const ErrorPageBoldText = styled.p`
  font-weight: 700;
  font-size: ${getRemValue(27)};
  margin-bottom: 2rem;

  @media screen and (min-width: 56.25em) {
    font-size: ${getRemValue(57)};
    margin-top: 1rem;
    width: 85%;
  }
`;

export const ErrorPageLinksContainer = styled.div`
  display: flex;
  gap: ${getRemValue(20)};

  @media screen and (max-width: 56.25em) {
    margin-bottom: 2rem;
  }

  @media screen and (min-width: 56.25em) {
    width: 80%;
    padding: 2rem;
    padding-left: 0;
    gap: ${getRemValue(50)};
  }

  & > a {
    flex-basis: 50%;
    text-align: center;
  }
`;

export const ErrorPageImageContainer = styled.div`
  aspect-ratio: 1;
  position: relative;

  & > img {
    object-fit: cover;
    z-index: -1;
  }
`;
