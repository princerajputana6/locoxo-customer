import React from 'react'
import Hero from '../components/Hero'
import MatchTheMood from '../components/MatchTheMood'
import SpotOnInstagram from '../components/SpotOnInstagram'
import PriceBasedCombo from '../components/PriceBasedCombo'
import BestSeller from '../components/BestSeller'
import NewArrivals from '../components/NewArrivals'
import VideoIntro from '../components/VideoIntro'
import YourFavorites from '../components/YourFavorites'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'

const Home = () => {
  return (
    <div>
      <Hero />
      <MatchTheMood />
      <SpotOnInstagram />
      <PriceBasedCombo />
      <BestSeller />
      <NewArrivals />
      <VideoIntro />
      <YourFavorites />
      <OurPolicy />
      <NewsletterBox />
    </div>
  )
}

export default Home
