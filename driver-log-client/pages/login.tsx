import { NextPageWithLayout } from './_app';
import SignUpCard from '@/components/cards/auth-card/auth-card';
import GeneralLayout from '@/layout/general-layout';
import {
  AuthContainer,
  AuthPageImageContainer,
  TabList,
} from '@/styles/auth-page-style';
import Image from 'next/image';
import { Root, Trigger, Content } from '@radix-ui/react-tabs';

export const types = ['Driver', 'Admin'];

const LoginPage: NextPageWithLayout = () => {
  return (
    <>
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
            <SignUpCard type={types[0]} isLoginPage />
          </Content>

          <Content value={types[1]}>
            <SignUpCard type={types[1]} isLoginPage isAdmin />
          </Content>
        </Root>
      </AuthContainer>
    </>
  );
};

LoginPage.getLayout = function getLayout(page) {
  return <GeneralLayout pageTitle="Sign up">{page}</GeneralLayout>;
};

export default LoginPage;
