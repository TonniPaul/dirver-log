import { NextPageWithLayout } from './_app';
import SignUpCard from '@/components/cards/auth-card/auth-card';
import GeneralLayout from '@/layout/general-layout';
import {
  AuthContainer,
  AuthPageImageContainer,
} from '@/styles/auth-page-style';
import Image from 'next/image';

const SignUpPage: NextPageWithLayout = () => {
  return (
    <>
      <AuthContainer>
        <AuthPageImageContainer>
          <Image src="/assets/sn.svg" alt="sign-up-form-illustration" fill />
        </AuthPageImageContainer>
        <SignUpCard type="" />
      </AuthContainer>
    </>
  );
};

SignUpPage.getLayout = function getLayout(page) {
  return <GeneralLayout pageTitle="Sign up">{page}</GeneralLayout>;
};

export default SignUpPage;
