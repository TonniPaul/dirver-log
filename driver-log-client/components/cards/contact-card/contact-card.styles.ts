import getRemValue from '@/utils/getRemValue';
import styled from 'styled-components';

export const ContactCardContainer = styled.div`
   background-color: rgb(var(--color-primary), 0.2);
   border-radius: ${getRemValue(10)};
   padding: ${getRemValue(24)};
   border: 2px solid rgb(var(--color-primary), 0.15);
   flex-basis: 49%;
   margin-bottom: 1rem;

   & > svg {
      width: ${getRemValue(46)};
      height: ${getRemValue(40)};
   }
`

export const ContactCardText = styled.p<{ isBold?: boolean, isSemiBold?: boolean }>`
   margin-top: 1rem;

   ${({ isBold }) =>
      isBold && `
         font-weight: 700;
         font-size: ${getRemValue(18)};
      }
      `
   }

    ${({ isSemiBold }) =>
      isSemiBold && `
         font-weight: 600;
         font-size: ${getRemValue(14)};
      }
      `
   }
`