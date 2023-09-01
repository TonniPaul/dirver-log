import getRemValue from '@/utils/getRemValue';
import Link from 'next/link';
import styled from 'styled-components';

export const LogoContainer = styled(Link)`
   display: flex;
   align-items: center;

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
