import type { NextPageWithLayout } from './_app';
import {
  ContactFlexContainer,
  ContactForm,
  ContactFormFields,
  ContactFormGroup,
  ContactPageContainer,
  ContactsTextContainer,
} from '@/styles/contact-page.styles';
import SvgIcon from '@/components/svg-icon/svg-icon';
import ContactCard from '@/components/cards/contact-card/contact-card';
import { montserrat } from '@/helpers/fonts';
import GeneralLayout from '@/layout/general-layout';
import Link from 'next/link';
import { ContactCardText } from '@/components/cards/contact-card/contact-card.styles';

const ContactPage: NextPageWithLayout = () => {
  return (
    <ContactPageContainer>
      <ContactsTextContainer>
        <h1>How can we help ?</h1>
        <ContactFlexContainer flexOnMobile>
          <p>Fill the form on your right to get started.</p>
          <SvgIcon
            name="arrow-right"
            width={20}
            height={20}
            fill="rgb(var(--color-primary))"
          />
        </ContactFlexContainer>

        <ContactFlexContainer isBold hasMoreMargin flexOnMobile>
          <p>You can also reach us via</p>
          <SvgIcon
            name="arrow-down-left"
            width={20}
            height={20}
            fill="rgb(var(--color-primary))"
          />
        </ContactFlexContainer>

        <ContactFlexContainer hasMoreGap>
          <ContactCard
            icon="message-solid"
            heading="Send mail"
            subHeading="Click on any of the mails below to send a mail"
          >
            <ContactCardText>
              <Link href="mailto:info@tonnipaul.com">info@tonnipaul.com</Link>
            </ContactCardText>
            <ContactCardText>
              <Link href="mailto:isaacphiri315@gmail.com">
                isaacphiri315@gmail.com
              </Link>
            </ContactCardText>
          </ContactCard>
          <ContactCard
            icon="calling"
            heading="Call us"
            subHeading="Click on any of the numbers to make call us"
          >
            <ContactCardText>
              <Link href="tel:2347025007998">+2347025007998</Link>
            </ContactCardText>
            <ContactCardText>
              <Link href="tel:260971727180">+260971727180</Link>
            </ContactCardText>
          </ContactCard>
        </ContactFlexContainer>
      </ContactsTextContainer>

      <ContactForm className={montserrat.className}>
        <ContactFormGroup>
          <ContactFormFields>
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              name="first-name"
              placeholder="Enter your first name"
            />
          </ContactFormFields>
          <ContactFormFields>
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              name="last-name"
              placeholder="Enter your last name"
            />
          </ContactFormFields>
        </ContactFormGroup>

        <ContactFormFields>
          <label htmlFor="email">Email</label>
          <input type="mail" name="email" placeholder="Enter your email" />
        </ContactFormFields>

        <ContactFormFields>
          <label htmlFor="phone-number">Phone Number</label>
          <input
            type="tel"
            name="phone-number"
            placeholder="Enter your phone-number"
          />
        </ContactFormFields>

        <ContactFormFields>
          <label htmlFor="message">Message</label>
          <textarea
            name="first-name"
            placeholder="Enter your message"
            rows={6}
          />
        </ContactFormFields>

        <button>Submit</button>
      </ContactForm>
    </ContactPageContainer>
  );
};

ContactPage.getLayout = (page) => {
  return <GeneralLayout pageTitle="Contact">{page}</GeneralLayout>;
};

export default ContactPage;
