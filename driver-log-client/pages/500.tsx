import type { NextPageWithLayout } from './_app';
import {
  ErrorPageBoldText,
  ErrorPageContainer,
  ErrorPageImageContainer,
  ErrorPageLinksContainer,
} from '@/styles/error-page.styles';
import Image from 'next/image';
import LinkButton from '@/components/button/link-button';
import GeneralLayout from '@/layout/general-layout';

const Error404Page: NextPageWithLayout = () => {
  return (
    <ErrorPageContainer>
      <div>
        <ErrorPageBoldText>Something went wrong.....</ErrorPageBoldText>

        <ErrorPageLinksContainer>
          <LinkButton href={'/contact'}>Contact Us</LinkButton>
          <LinkButton href={'/'} primary>
            Go Home
          </LinkButton>
        </ErrorPageLinksContainer>
      </div>
      <ErrorPageImageContainer>
        <Image src="/assets/500error.svg" alt="error 500 " fill />
      </ErrorPageImageContainer>
    </ErrorPageContainer>
  );
};

Error404Page.getLayout = (page) => {
  return <GeneralLayout pageTitle="Page not found">{page}</GeneralLayout>;
};

export default Error404Page;
