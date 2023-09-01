import getRemValue from '@/utils/getRemValue';
import styled from 'styled-components';

export const HeroWrapper = styled.section`
   max-width: var(--max-width);
   margin: 0 auto;
   padding: var(--padding-sm);

   @media screen and (min-width: 56.25em) {
      padding: var(--padding-lg);
      padding-top: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      & > div {
         flex-basis: 48%;
      }
   }
`

export const HeroDescriptionContainer = styled.div`
   text-align: center;

   & > h1 {
      font-size: ${getRemValue(25)};
      margin-bottom: 2rem;
   }

   & > p {
      font-weight: 600;
      font-style: italic;
   }
   
   @media screen and (min-width: 56.25em) {
      padding-right: 2rem;
      text-align: initial;

      & > h1 {
         font-size: ${getRemValue(35)};
      }
   }
`

export const HeroImageContainer = styled.div`
   position: relative;
   width: 100%;

   @media screen and (max-width: 56.25em) {
      aspect-ratio: 1;
   }

   @media screen and (min-width: 56.25em) {
      height: ${getRemValue(500)};
   }

   & > img {
      object-fit: contain;
      z-index: -1;
   }
`