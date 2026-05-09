import React, { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import MatchTheMood from '../components/MatchTheMood'
import SpotOnInstagram from '../components/SpotOnInstagram'
import PriceBasedCombo from '../components/PriceBasedCombo'
import BestSeller from '../components/BestSeller'
import NewArrivals from '../components/NewArrivals'
import VideoIntro from '../components/VideoIntro'
import YourFavorites from '../components/YourFavorites'
import OurPolicy from '../components/OurPolicy'
import BannerDisplay from '../components/BannerDisplay'
import axios from 'axios'

const Home = () => {
  const [banners, setBanners] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/banner/list`);
        if (response.data.success) {
          // Filter only active banners
          const activeBanners = response.data.banners.filter(b => b.isActive);
          setBanners(activeBanners);
        }
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };
    fetchBanners();
  }, []);

  const getBannersForPlacement = (placement) => {
    return banners
      .filter(b => b.placement === placement)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  };

  return (
    <div>
      <Hero />
      {getBannersForPlacement('after-hero').map((banner, index) => (
        <BannerDisplay key={`after-hero-${index}`} banner={banner} />
      ))}
      
      <SpotOnInstagram />
      {getBannersForPlacement('after-instagram').map((banner, index) => (
        <BannerDisplay key={`after-instagram-${index}`} banner={banner} />
      ))}
      
      <MatchTheMood />
      {getBannersForPlacement('after-match-mood').map((banner, index) => (
        <BannerDisplay key={`after-match-mood-${index}`} banner={banner} />
      ))}
      
      <PriceBasedCombo />
      {getBannersForPlacement('after-price-combo').map((banner, index) => (
        <BannerDisplay key={`after-price-combo-${index}`} banner={banner} />
      ))}
      
      <BestSeller />
      {getBannersForPlacement('after-best-seller').map((banner, index) => (
        <BannerDisplay key={`after-best-seller-${index}`} banner={banner} />
      ))}
      
      <NewArrivals />
      {getBannersForPlacement('after-new-arrivals').map((banner, index) => (
        <BannerDisplay key={`after-new-arrivals-${index}`} banner={banner} />
      ))}
      
      <VideoIntro />
      {getBannersForPlacement('after-video-intro').map((banner, index) => (
        <BannerDisplay key={`after-video-intro-${index}`} banner={banner} />
      ))}
      
      <YourFavorites />
      {getBannersForPlacement('after-favorites').map((banner, index) => (
        <BannerDisplay key={`after-favorites-${index}`} banner={banner} />
      ))}
      
      <OurPolicy />
      {getBannersForPlacement('after-stats').map((banner, index) => (
        <BannerDisplay key={`after-stats-${index}`} banner={banner} />
      ))}
    </div>
  )
}

export default Home
