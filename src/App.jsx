import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import PromoStrip from './components/PromoStrip'
import Loader from './components/Loader'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages are lazy-loaded so every route shows the branded loader until it's ready.
const Home = lazy(() => import('./pages/Home'))
const Collection = lazy(() => import('./pages/Collection'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Product = lazy(() => import('./pages/Product'))
const Cart = lazy(() => import('./pages/Cart'))
const Login = lazy(() => import('./pages/Login'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const ResetPassword = lazy(() => import('./pages/ResetPassword'))
const PlaceOrder = lazy(() => import('./pages/PlaceOrder'))
const Orders = lazy(() => import('./pages/Orders'))
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'))
const Profile = lazy(() => import('./pages/Profile'))
const TrackOrder = lazy(() => import('./pages/TrackOrder'))
const Verify = lazy(() => import('./pages/Verify'))
const VerifyCashfree = lazy(() => import('./pages/VerifyCashfree'))
const VerifySubscription = lazy(() => import('./pages/VerifySubscription'))
const Membership = lazy(() => import('./pages/Membership'))
const Referral = lazy(() => import('./pages/Referral'))
const CookiesPolicy = lazy(() => import('./pages/CookiesPolicy'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const GrievancePolicy = lazy(() => import('./pages/GrievancePolicy'))
const Terms = lazy(() => import('./pages/Terms'))
const ReturnPolicy = lazy(() => import('./pages/ReturnPolicy'))
const CancellationPolicy = lazy(() => import('./pages/CancellationPolicy'))
const FAQ = lazy(() => import('./pages/FAQ'))

const App = () => {
  return (
    <div>
      <ToastContainer />
      <PromoStrip />
      <Navbar />
      <SearchBar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/order-confirmation/:orderId' element={<OrderConfirmation />} />
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
          <Route path='/terms' element={<Terms />} />
          <Route path='/return-policy' element={<ReturnPolicy />} />
          <Route path='/cancellation-policy' element={<CancellationPolicy />} />
          <Route path='/faq' element={<FAQ />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  )
}

export default App
