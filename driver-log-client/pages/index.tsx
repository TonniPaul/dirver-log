import { Inter } from 'next/font/google'
import { NextPageWithLayout } from './_app'
import GeneralLayout from '@/layout/general-layout'

const inter = Inter({ subsets: ['latin'] })

const Home: NextPageWithLayout = () => {
  return (
    <>
      <h1>Driver Log</h1>
    </>
  )
}

export default Home

Home.getLayout = function getLayout(page) {
  return (
    <GeneralLayout pageTitle='Home' description='Efficiently Track and Manage Your Driver Logs with Driver Log - Simplify Compliance, Maximize Efficiency!'>
      {page}
    </GeneralLayout>
  )
}
