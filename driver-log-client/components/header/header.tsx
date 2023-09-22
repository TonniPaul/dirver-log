import LinkButton from '../button/link-button';
import Logo from '../logo/logo';
import {
  HeaderWrapper,
  MenuIcon,
  NavItems,
  NavLinkButton,
  NavLinksContainer,
} from './header.styles';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import routes from '@/lib/routes';
import { useStore } from '@/store';
import Button from '../button/button';

const navLinks = [
  {
    name: 'Features',
    href: '#',
  },
  {
    name: 'About',
    href: '#',
  },
  {
    name: 'Contact',
    href: '/contact',
  },
];
const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const { admin, clearAdmin, clearDriver, driver } = useStore();

  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isActive]);

  const handleClick = () => {
    setIsActive(isActive && false);
  };

  return (
    <HeaderWrapper>
      <nav>
        <Logo />
        <NavLinksContainer active={isActive}>
          <MenuIcon name="close" onClick={() => setIsActive(false)} isClose />
          <NavItems>
            {navLinks.map(({ name, href }, index) => {
              return (
                <li key={index} onClick={handleClick}>
                  <Link href={href}>{name}</Link>
                </li>
              );
            })}
          </NavItems>

          {admin || driver ? (
            <NavLinkButton>
              <Button isBlock onClick={admin ? clearAdmin : clearDriver}>
                Sign Out
              </Button>
              <LinkButton href={routes.dashboard()} primary>
                Dashboard
              </LinkButton>
            </NavLinkButton>
          ) : (
            <NavLinkButton>
              <LinkButton href={routes.login()} isBlock onClick={handleClick}>
                Sign In
              </LinkButton>

              <LinkButton
                href={routes.signUp()}
                primary
                isBlock
                onClick={handleClick}
              >
                Sign Up
              </LinkButton>
            </NavLinkButton>
          )}
        </NavLinksContainer>
        <MenuIcon name="menu" onClick={() => setIsActive(true)} />
      </nav>
    </HeaderWrapper>
  );
};

export default Header;
