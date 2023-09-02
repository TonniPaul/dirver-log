import getRemValue from '@/utils/getRemValue';
import styled from 'styled-components';

export const ErrorPageContainer = styled.div`
   display: flex;
   align-items: center;
   max-width: var(--max-width);
   margin: 0 auto;
   padding: 0 2rem 4rem;

   & > div {
      flex-basis: 50%;
   }

   & > div:first-child {
      padding-right: 3rem;

      & > p:last-of-type {
         margin-top: 3rem;
         margin-bottom: 5rem;
      }
   }
`;

export const ErrorPageBoldText = styled.p`
   font-size: ${getRemValue(57)};
   margin-top: 1rem;
   font-weight: 700;
   width: 85%;
`;

export const ErrorPageLinksContainer = styled.div`
  display: flex;
  gap: ${getRemValue(50)};
  width: 80%;

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
   }
`