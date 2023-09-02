import type { NextPageWithLayout } from './_app';
import { ErrorPageBoldText, ErrorPageContainer, ErrorPageImageContainer, ErrorPageLinksContainer } from '@/styles/error-page.styles';
import Image from 'next/image';
import LinkButton from '@/components/button/link-button';
import GeneralLayout from '@/layout/general-layout';
import { mr_Dafoe } from '@/helpers/fonts';



const Error404Page: NextPageWithLayout = () => {
   return (
      <ErrorPageContainer>
         <div>
            <ErrorPageBoldText>Something went wrong.....</ErrorPageBoldText>
            <p>
               Please double-check the URL or try refreshing the page. If the issue persists, feel free to contact our support team for assistance
            </p>

            <ErrorPageLinksContainer>
               <LinkButton href={'/contact'}>Contact Us</LinkButton>
               <LinkButton href={'/'} primary>Go Home</LinkButton>
            </ErrorPageLinksContainer>
         </div>
         <ErrorPageImageContainer>
            <Image src='/assets/error.svg' alt='error 404 ' fill />
         </ErrorPageImageContainer>

      </ErrorPageContainer>
   )
};

Error404Page.getLayout = (page) => {
   return <GeneralLayout pageTitle="Page not found">{page}</GeneralLayout>;
};

export default Error404Page;
