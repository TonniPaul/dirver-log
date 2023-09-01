import getRemValue from '@/utils/getRemValue';
import styled from 'styled-components';

export interface IFlexContainerProps {
  spaceBetween?: boolean;
  gapLG?: boolean;
  center?: boolean;
}

export const FlexContainer = styled.div<IFlexContainerProps>`
  display: flex;
  gap: ${getRemValue(10)};
  flex: 1;

  ${({ gapLG }) =>
    gapLG && `
  gap: 1ren;
  `
  }

  ${({ center }) =>
    center && `
  justify-content: center;
  `
  }

  ${({ spaceBetween }) =>
    spaceBetween && `
  justify-content: space-between;
  `
  }
`;
