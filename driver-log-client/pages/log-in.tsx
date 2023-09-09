import { NextPageWithLayout } from "./_app";
import SignUpCard from "@/components/cards/auth-card/auth-card";
import { SignUpPageImageContainer } from "@/components/footer/footer.styles";
import GeneralLayout from "@/layout/general-layout";
import { AuthContainer, TabList } from "@/styles/auth-page-style";
import Image from "next/image";
import { Root, Trigger, Content } from '@radix-ui/react-tabs'
import Button from "@/components/button/button";
import { useState } from "react";

const type = ['Driver', 'Admin']

const LoginPage: NextPageWithLayout = () => {
   const [activeType, setActiveType] = useState(type[0])

   return (
      <>
         <AuthContainer>
            <SignUpPageImageContainer>
               <Image
                  src='/assets/login-vector.svg'
                  alt='sign-up-form-illustration'
                  fill
               />
            </SignUpPageImageContainer>
            <Root defaultValue={type[0]}>
               <TabList>
                  {type.map((type) => {
                     return (
                        <Trigger value={type} key={type}>
                           <Button primary={type === activeType} onClick={() => setActiveType(type)}>
                             Log In as {type}
                           </Button>
                        </Trigger>
                     )
                  })}
                  
               </TabList>
               
               <Content value={type[0]}>
                  <SignUpCard
                     type={type[0]}
                     isLoginPage
                  />
               </Content>
 
           
               <Content value={type[1]}>
                  <SignUpCard
                     type={type[1]}
                     isAdmin
                     isLoginPage
                  />
               </Content>
            
            </Root>
         </AuthContainer>
      </>
   )
}

LoginPage.getLayout = function getLayout(page) {
   return (
      <GeneralLayout pageTitle="Sign up">
         {page}
      </GeneralLayout>
   );
};

export default LoginPage