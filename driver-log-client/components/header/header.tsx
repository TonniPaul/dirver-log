import { FlexContainer } from "@/styles/glabal.styles";
import LinkButton from "../button/link-button";
import Logo from "../logo/logo";
import { HeaderWrapper, MenuIcon, NavItems, NavLinkButton, NavLinksContainer } from "./header.styles";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
   const [isActive, setIsActive] = useState(false)

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
                  <li><Link href='#'>Features</Link></li>
                  <li><Link href='#'>About</Link></li>
                  <li><Link href='#'>Contact</Link></li>
               </NavItems>
               <NavLinkButton>
                  <LinkButton href="/" isBlock>
                     Sign In
                  </LinkButton>

                  <LinkButton href="/" primary isBlock>
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