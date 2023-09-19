import styled from 'styled-components';
import { Content, Arrow } from '@radix-ui/react-popover';
import SvgIcon from '../svg-icon/svg-icon';

export interface IPopoverStyleProps {
  iconPrimary?: boolean;
  paddingRight?: boolean;
}

export const PopoverIcon = styled(SvgIcon)<IPopoverStyleProps>`
  ${({ iconPrimary }) =>
    iconPrimary &&
    `
    color: rgb(var(--color-primary)); 
  `}
`;

export const PopoverArrow = styled(Arrow)<IPopoverStyleProps>`
  ${({ iconPrimary }) =>
    iconPrimary &&
    `
    fill: rgb(var(--color-primary)); 
  `}
`;

export const PopoverContent = styled(Content)<IPopoverStyleProps>`
  background-color: rgb(var(--color-white));
  border: 1px solid rgb(var(--color-primary));
  appearance: none;
  --webkit-appearance: none;
  ${({ paddingRight }) =>
    paddingRight &&
    `
    margin-right: 1.5rem; 
  `}
`;
