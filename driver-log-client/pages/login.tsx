import { NextPageWithLayout } from './_app';
import GeneralLayout from '@/layout/general-layout';
import {
  AuthContainer,
  AuthPageImageContainer,
  TabList,
} from '@/styles/auth-page-style';
import Image from 'next/image';
import { Root, Trigger, Content } from '@radix-ui/react-tabs';
import { useRouter } from 'next/router';
import { useStore } from '@/client-store';
import routes from '@/lib/routes';
import { useLayoutEffect } from 'react';
import LoginForm from '@/components/cards/form/login-form';
import Loader from '@/components/loader/loader';

export const types = ['Driver', 'Admin'];

const LoginPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { admin, driver } = useStore();

  useLayoutEffect(() => {
    if (admin || driver) {
      router.replace(routes.dashboard());
    }
  }, [admin, driver, router]);

  return (
    <>
      {admin || driver ? (
        <Loader />
      ) : (
        <AuthContainer>
          <AuthPageImageContainer>
            <Image
              src="/assets/login-vector.svg"
              alt="sign-up-form-illustration"
              fill
            />
          </AuthPageImageContainer>
          <Root defaultValue={types[0]}>
            <TabList>
              {types.map((type) => {
                return (
                  <Trigger asChild value={type} key={type}>
                    <span>Log In as {type}</span>
                  </Trigger>
                );
              })}
            </TabList>

            <Content value={types[0]}>
              <LoginForm type={types[0]} />
            </Content>

            <Content value={types[1]}>
              <LoginForm type={types[1]} isAdmin />
            </Content>
          </Root>
        </AuthContainer>
      )}
    </>
  );
};

LoginPage.getLayout = function getLayout(page) {
  return <GeneralLayout pageTitle="Sign up">{page}</GeneralLayout>;
};

export default LoginPage;
