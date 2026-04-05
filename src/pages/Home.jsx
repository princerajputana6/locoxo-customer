import React from 'react'
import Hero from '../components/Hero'
import TopCategory from '../components/TopCategory'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import AnimeSuperHero from '../components/AnimeSuperHero'
import StockClearance from '../components/StockClearance'
import InfluencerSection from '../components/InfluencerSection'
import ReviewSystem from '../components/ReviewSystem'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'

const Home = () => {
  return (
    <div>
      <Hero />
      <BestSeller/>
      <StockClearance />
      <InfluencerSection />
      <TopCategory />
      <LatestCollection/>
      <AnimeSuperHero />
      <ReviewSystem />
      <OurPolicy/>
      <NewsletterBox/>
    </div>
  )
}

export default Home
