import { NextPageWithLayout } from './_app';
import SignUpForm from '@/components/cards/form/sign-up-form';
import GeneralLayout from '@/layout/general-layout';
import routes from '@/lib/routes';
import { useStore } from '@/store';
import {
  AuthContainer,
  AuthPageImageContainer,
} from '@/styles/auth-page-style';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useLayoutEffect } from 'react';

const SignUpPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { admin, driver } = useStore();

  useLayoutEffect(() => {
    if (admin || driver) {
      router.replace(routes.dashboard());
    }
  }, []);
  return (
    <>
      <AuthContainer>
        <AuthPageImageContainer>
          <Image src="/assets/sn.svg" alt="sign-up-form-illustration" fill />
        </AuthPageImageContainer>
        <SignUpForm />
      </AuthContainer>
    </>
  );
};

SignUpPage.getLayout = function getLayout(page) {
  return <GeneralLayout pageTitle="Sign up">{page}</GeneralLayout>;
};

export default SignUpPage;
