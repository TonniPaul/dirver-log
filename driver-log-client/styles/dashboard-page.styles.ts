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
  & > * {
    padding: ${getRemValue(15)};

    @media screen and (min-width: 62.5em) {
      padding: ${getRemValue(40)} 2rem;
    }
  }
`;
export const SidebarContainer = styled.div`
  background-color: rgb(var(--color-white));
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: max-content;
  padding-right: 1rem;
  padding-left: 1rem;
  text-align: center;

  @media screen and (min-width: 62.5em) {
    display: block;
    width: ${getRemValue(230)};
    height: 100vh;
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
  padding-left: 1.5rem;

  @media screen and (min-width: 62.5em) {
    position: relative;
    display: block;
    height: 70%;
    margin: 2rem 0;
    padding-left: 0;
  }
`;

export const SidebarMobileMenu = styled.button`
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

export const LogoutButton = styled.button`
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
    display: none;
  }
`;

export const DashboardContentContainer = styled.div`
  flex: 1;
`;

export const DashboardHeaderText = styled.p`
  font-weight: 700;
  font-size: ${getRemValue(20)};
`;

export const RightSidebar = styled.div`
  background-color: rgb(var(--color-white));
  height: 100vh;
  width: ${getRemValue(350)};
`;
