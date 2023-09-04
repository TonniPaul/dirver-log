import SvgIcon from "@/components/svg-icon/svg-icon";
import { ContactCardContainer, ContactCardText } from "./contact-card.styles"
import { ReactNode } from "react";

interface IContactCardProps {
   icon: string;
   heading: string;
   subHeading: string;
   children: ReactNode;
}

const ContactCard = ({ icon, heading, subHeading, children }: IContactCardProps) => {
   return (
      <ContactCardContainer>
         <SvgIcon name={icon} />

         <ContactCardText isBold>{heading}</ContactCardText>
         <ContactCardText isSemiBold>{subHeading}</ContactCardText>
         <div>{children}</div>

      </ContactCardContainer>
   )
}

export default ContactCard;