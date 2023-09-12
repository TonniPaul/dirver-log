import LinkButton from "../button/link-button";
import Logo from "../logo/logo";
import { HeaderWrapper, MenuIcon, NavItems, NavLinkButton, NavLinksContainer } from "./header.styles";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
   {
      name: "Features",
      href: "#"
   },
   {
      name: "About",
      href: "#"
   },
   {
      name: "Contact",
      href: "/contact"
   },
]
const Header = () => {
   const [isActive, setIsActive] = useState(false);

   useEffect(() => {
      if (isActive) {
         document.body.style.overflow = 'hidden';
      } else {
         document.body.style.overflow = '';
      }
   }, [isActive]);

   const handleClick = () => {
      setIsActive(isActive && false)
   }

   return (
      <HeaderWrapper>
         <nav>
            <Logo />
            <NavLinksContainer active={isActive}>
               <MenuIcon
                  name="close"
                  onClick={() => setIsActive(false)}
                  isClose
               />
               <NavItems>
                  {navLinks.map(({ name, href }, index) => {
                     return (
                        <li
                           key={index}
                           onClick={handleClick}
                        >
                           <Link href={href}>{name}</Link>
                        </li>
                     )
                  })}
               </NavItems>
               <NavLinkButton>
                  <LinkButton href="/log-in" isBlock onClick={handleClick}>
                     Sign In
                  </LinkButton>

                  <LinkButton href="/sign-up" primary isBlock onClick={handleClick}>
                     Sign Up
                  </LinkButton>
               </NavLinkButton>
            </NavLinksContainer>
            <MenuIcon
               name="menu"
               onClick={() => setIsActive(true)}
            />
         </nav>
      </HeaderWrapper>
   );
};

export default Header;