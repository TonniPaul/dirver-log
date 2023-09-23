import getRemValue from '@/utils/getRemValue';
import styled from 'styled-components';
import SvgIcon from '../svg-icon/svg-icon';

export const HeaderWrapper = styled.header`
  background-color: rgb(var(--color-white));
  color: rgb(var(--color-primary));
  box-shadow: var(--box-shadow);
  position: sticky;

  & > nav {
    padding: 1rem;
    max-width: var(--max-width);
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;

    @media screen and (min-width: 56.25em) {
      padding: 1rem 2rem;
    }
  }
`;

export const NavLinksContainer = styled.div<{ active?: boolean }>`
  @media screen and (max-width: 56.25em) {
    position: fixed;
    width: 93vw;
    height: 100vh;
    background: rgb(var(--color-white));
    transition: right 0.2s ease-in-out;
    top: 0;
    right: -100%;
    padding: 4rem;
    z-index: 9;

    ${({ active }) =>
      active &&
      `
      right: 0;
      box-shadow: -2px 85px 6px #d6d6d6;
     
   `}
    & > * {
      margin: auto;
      width: max-content;
    }
  }

  @media screen and (min-width: 56.25em) {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: space-between;
  }
`;

export const NavItems = styled.ul`
  list-style: none;
  font-weight: 600;
  padding: 2rem;

  @media screen and (min-width: 56.25em) {
    padding: 0 3rem;
    display: flex;
    gap: 2rem;
  }

  & > li {
    transition: border 0.2s ease-in-out;

    @media screen and (max-width: 56.25em) {
      text-align: center;
      margin-bottom: 2rem;
    }

    &:hover {
      border-bottom: 1px solid currentColor;
    }
  }
`;

export const NavLinkButton = styled.div`
  @media screen and (min-width: 56.25em) {
    display: flex;
    gap: 1rem;
  }

  & > a,
  & > button {
    width: ${getRemValue(150)};

    @media screen and (max-width: 56.25em) {
      margin-bottom: 2rem;
    }
  }
`;

export const MenuIcon = styled(SvgIcon)<{ isClose?: boolean }>`
  width: ${getRemValue(50)};
  height: ${getRemValue(50)};
  fill: rgb(var(--color-primary));
  cursor: pointer;
  background-color: rgb(var(--color-primary), 0.06);
  border-radius: 50%;
  transition: transform 0.5s ease-in-out;

  ${({ isClose }) =>
    isClose &&
    `
      padding: ${getRemValue(13)};
      position: absolute;
      top: 1rem;
      right: 1rem;
   `}

  &:hover {
    transform: rotate(360deg);
  }

  @media screen and (min-width: 56.25em) {
    display: none;
  }
`;
