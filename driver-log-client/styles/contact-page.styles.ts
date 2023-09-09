import getRemValue from '@/utils/getRemValue';
import styled from 'styled-components';

export const ContactPageContainer = styled.div`
   padding: var(--padding-sm);

   @media screen and (min-width: 56.25em) {
      padding: var(--padding-lg);
      max-width: var(--max-width);
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      align-items: center;
      gap: 4rem;
   }
`

export const ContactsTextContainer = styled.div`
   
   @media screen and (max-width: 56.25em) {
      padding-bottom: 3rem;
   }
   
   @media screen and (min-width: 56.25em) {
      flex-basis: 50%;

      & > h1 {
         font-size: ${getRemValue(47)};
      }
   }
`

export const ContactFlexContainer = styled.div<{
   isBold?: boolean,
   hasMoreMargin?: boolean,
   hasMoreGap?: boolean,
   flexOnMobile?: boolean
}>`
   ${({ flexOnMobile }) =>
      flexOnMobile && `
         display: flex;
         align-items: center;
      `
   }

   @media screen and (min-width: 56.25em) {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 1rem;
   }


   ${({ isBold }) =>
      isBold && `
         & > p {
            font-weight: 600;
            font-size: ${getRemValue(20)};

            @media screen and (min-width: 56.25em) {
               font-size: ${getRemValue(26)};
            }
         }
         `
   }

    ${({ hasMoreGap }) =>
      hasMoreGap && `
         gap: ${getRemValue(24)};
         `
   }

   ${({ hasMoreMargin }) =>
      hasMoreMargin && `
         margin: 3rem 0;

         @media screen and (min-width: 56.25em) {
            margin-top: 5rem;
            margin-bottom: 2rem;
         }
         `
   }
`

export const ContactForm = styled.form`
   flex-basis: 45%;
   max-width: ${getRemValue(500)};
   margin: 0 auto;
   padding: 2rem;
   border: 1px solid rgb(var(--color-primary)) ;
   border-radius: ${getRemValue(20)};

   & > button {
      width: 100%;
      padding: 1rem;
      text-align: center;
      background-color: rgb(var(--color-primary));
      color: rgb(var(--color-white));
      border-radius: inherit;
   }
`

export const ContactFormGroup = styled.div`
   display: flex;
   gap: ${getRemValue(24)};
   display: block;

   & > div {
      flex-basis: 50%;
   }
`

export const ContactFormFields = styled.div`
    & > label {
       font-size: ${getRemValue(18)};
       font-weight: 600;
       display: block;

      @media screen and (min-width: 56.25em) {
         font-size: ${getRemValue(20)};
      }
      }
   
    & > input, & > textarea {
         outline: none;
         margin: 1rem 0;
         width: 100%;
         border-radius: ${getRemValue(20)};
         border: 1px solid rgb(var(--color-primary));
         padding: 1rem;
         resize: none;

         &::placeholder {
            font-family: inherit;
            font-weight: 600;
            opacity: 0.6;
         }

      }
`