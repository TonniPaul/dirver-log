import styled from 'styled-components';
import { Content, Arrow } from '@radix-ui/react-popover';
import SvgIcon from '../svg-icon/svg-icon';
import getRemValue from '@/utils/getRemValue';

export interface IPopoverStyleProps {
  iconPrimary?: boolean;
  paddingRight?: boolean;
  isSmaller?: boolean;
}

export const PopoverIcon = styled(SvgIcon)<IPopoverStyleProps>`
  width: ${getRemValue(30)};
  height: ${getRemValue(30)};

  ${({ isSmaller }) =>
    isSmaller &&
    `
    width: ${getRemValue(20)};
    height: ${getRemValue(20)}; 
  `}

  ${({ iconPrimary }) =>
    iconPrimary &&
    `
    color: rgb(var(--color-primary)); 
  `}
`;

export const PopoverArrow = styled(Arrow)<IPopoverStyleProps>`
  stroke: rgb(var(--color-black), 0.3);
  fill: none;
  ${({ iconPrimary }) =>
    iconPrimary &&
    `
    stroke: rgb(var(--color-primary), 0.3);
  `}
`;

export const PopoverContent = styled(Content)<IPopoverStyleProps>`
  background-color: rgb(var(--color-white));
  border: 1px solid rgb(var(--color-black), 0.3);
  appearance: none;
  --webkit-appearance: none;
  ${({ paddingRight }) =>
    paddingRight &&
    `
    margin-right: 1.5rem; 
  `}
`;
