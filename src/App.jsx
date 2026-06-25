import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import TrackOrder from './pages/TrackOrder'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import PromoStrip from './components/PromoStrip'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
import VerifyCashfree from './pages/VerifyCashfree'
import VerifySubscription from './pages/VerifySubscription'
import Membership from './pages/Membership'
import Referral from './pages/Referral'
import CookiesPolicy from './pages/CookiesPolicy'
import PrivacyPolicy from './pages/PrivacyPolicy'
import GrievancePolicy from './pages/GrievancePolicy'

const App = () => {
  return (
    <div>
      <ToastContainer />
      <PromoStrip />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/track-order/:orderId' element={<TrackOrder />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/verify-cashfree' element={<VerifyCashfree />} />
        <Route path='/verify-subscription' element={<VerifySubscription />} />
        <Route path='/membership' element={<Membership />} />
        <Route path='/referral' element={<Referral />} />
        <Route path='/cookies-policy' element={<CookiesPolicy />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/grievance-policy' element={<GrievancePolicy />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
