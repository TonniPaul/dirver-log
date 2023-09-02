import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
import { montserrat } from '@/helpers/fonts';
import Head from 'next/head';
import { ReactNode } from 'react';

interface GeneralLayoutProps {
   pageTitle: string;
   children: ReactNode;
}

const GeneralLayout = ({
   pageTitle,
   children,
}: GeneralLayoutProps) => {
   const title = `${pageTitle} | Driver Log`;

   return (
      <>
         <Head>
            <title>{title}</title>
            <meta name="description" content='Efficiently Track and Manage Your Driver Logs with Driver Log - Simplify Compliance, Maximize Efficiency!' />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/assets/delivery-service.png" />
         </Head>
         <Header />
         <main className={montserrat.className}>{children}</main>
         <Footer />
      </>
   );
};

export default GeneralLayout;
