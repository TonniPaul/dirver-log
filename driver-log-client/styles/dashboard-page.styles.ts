import getRemValue from '@/utils/getRemValue';
import styled from 'styled-components';

export const DashboardContainer = styled.div`
  background-color: rgb(var(--color-primary), 0.09);
  width: 100%;

  @media screen and (min-width: 62.5em) {
    height: 100vh;
    justify-content: space-between;
    display: flex;
  }
`;
export const SidebarContainer = styled.div`
  background-color: rgb(var(--color-white));
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: max-content;
  padding: ${getRemValue(15)};
  padding-right: 1rem;
  padding-left: 1rem;
  text-align: center;
  box-shadow: var(--box-shadow);
  z-index: 1;

  @media screen and (min-width: 62.5em) {
    display: block;
    width: ${getRemValue(230)};
    height: 100vh;
    padding: ${getRemValue(30)} 1rem;
  }
`;

export const SidebarItems = styled.ul`
  list-style: none;
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 2rem;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: rgb(var(--color-white));
  box-shadow: 0px -1px 0px rgb(var(--color-primary), 0.2);
  padding-top: 1rem;

  @media screen and (min-width: 62.5em) {
    position: relative;
    display: block;
    height: 70%;
    margin: 2rem 0;
    padding-left: 0;
  }
`;

export const SidebarMobileMenu = styled.div`
  & > svg {
    fill: green !important;
    color: rgb(var(--color-primary));
    width: ${getRemValue(30)};
    height: ${getRemValue(30)};
  }

  @media screen and (min-width: 62.5em) {
    display: none;
  }
`;

export const LogoutButton = styled.div<{ hideOnMobile?: boolean }>`
  & > * {
    background-color: rgb(var(--color-error), 0.09);
    color: rgb(var(--color-error));
    width: max-content;
    margin: 0 auto;
    border: 1px solid rgb(var(--color-error));
    border-radius: 5px;
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 1rem;

    & > svg {
      width: 20px;
      height: 20px;
    }

    @media screen and (max-width: 62.5em) {
      background: none !important;
      border: none;

      ${({ hideOnMobile }) =>
        hideOnMobile &&
        `
         display: none;
      `}
    }
  }
`;

export const DashboardMobileSignOutMenu = styled.div`
  padding: 1rem 2rem;
  background-color: rgb(var(--color-white));
  border: 1px solid rgb(var(--color-primary));

  @media screen and (min-width: 62.5em) {
    display: none;
  }
`;

export const DashboardHeaderText = styled.p`
  font-weight: 700;
  font-size: ${getRemValue(13)};
`;

export const RightSidebar = styled.div`
  background-color: rgb(var(--color-white));
  height: 100vh;
  width: ${getRemValue(350)};
`;

export const DashboardContent = styled.div`
  flex: 1;
  min-height: calc(100vh);

  & > div {
    padding: 2rem;
  }
`;

export const DashboardNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  align-self: flex-start;
  flex: 1;
  background-color: rgb(var(--color-white));
  box-shadow: var(--box-shadow);
`;

export const NavProfileContainer = styled.button`
  display: flex;
  align-items: center;
  width: max-content;
  gap: ${getRemValue(10)};
  cursor: pointer;
  color: inherit;
  text-align: start;
  line-height: 0.8;

  & > div > p {
    font-weight: 600;
    font-size: ${getRemValue(13)};
  }

  & > div > small {
    opacity: 0.8;
    font-size: ${getRemValue(11)};
    text-transform: capitalize;
  }

  @media screen and (max-width: 62.5em) {
    display: none;
  }
`;

export const HideOnDesktopSpan = styled.span`
  font-weight: 600;

  @media screen and (min-width: 62.5em) {
    display: none;
  }
`;

export const ProfileImageContainer = styled.div`
  background-color: rgb(var(--color-primary), 0.4);
  border-radius: 50%;

  & > img {
    object-fit: contain;
  }
`;
