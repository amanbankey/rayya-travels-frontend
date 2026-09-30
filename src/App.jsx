import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import ScrollToTop from './components/ScrollToTop'
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from './layouts/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Packages from './pages/Packages'
import Visa from './pages/Visa'
import Flights from './pages/Flights'
import DashboardLayout from './pages/user/DashboardLayout'
import MyProfile from './pages/user/MyProfile'
import MyBookings from './pages/user/MyBookings'
import WalletHistory from './pages/user/WalletHistory'
import AppliedVisaHistory from './pages/user/AppliedVisaHistory'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ScrollToTop />

      <Routes>
 
        <Route path="/" element={<Layout />}>

          
          <Route index element={<Home />} />
  
        
          {/* <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
  */}
          <Route path="about" element={<About />} />

          <Route path="contact" element={<Contact />} />

        
          <Route
            path="flights"
            element={<Flights />}
          />

          <Route
            path="visa"
            element={<Visa />}
          />
          
          <Route
            path="packages"
            element={<Packages />}
          />

          <Route path="user-dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<MyProfile />} />
            <Route path="bookings" element={<MyBookings />} />
            <Route path="wallet" element={<WalletHistory />} />
            <Route path="visa-history" element={<AppliedVisaHistory />} />
          </Route>

        {/*    <Route
            path="traveler-details"
            element={<TravelerDetails />}
          />
 
          <Route
            path="user-dashboard"
            element={<MyBookings />}
          >
 
          </Route> */}
        </Route>
      </Routes>
    </>
  )
}

export default App
