import { NextPageWithLayout } from './_app'
import GeneralLayout from '@/layout/general-layout'
import Hero from '@/components/hero/hero'


const Home: NextPageWithLayout = () => {
  return (
    <>
      <Hero />
    </>
  )
}

export default Home

Home.getLayout = function getLayout(page) {
  return (
    <GeneralLayout pageTitle='Home'>
      {page}
    </GeneralLayout>
  )
}
