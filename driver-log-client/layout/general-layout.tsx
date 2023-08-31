import { montserrat } from '@/helpers/fonts';
import Head from 'next/head';
import { ReactNode } from 'react';

interface GeneralLayoutProps {
   pageTitle: string;
   description: string;
   children: ReactNode;
}

const GeneralLayout = ({
   pageTitle,
   description,
   children,
}: GeneralLayoutProps) => {
   const title = `${pageTitle} | Driver Log`;

   return (
      <>
         <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         Header
         <main className={montserrat.className}>{children}</main>
         Footer
      </>
   );
};

export default GeneralLayout;
