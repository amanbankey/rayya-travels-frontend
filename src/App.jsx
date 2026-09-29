import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import ScrollToTop from './components/ScrollToTop'
import { Routes, Route } from "react-router-dom";
import Layout from './layouts/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'

import Visa from './pages/Visa'
import Flights from './pages/Flights'
import Packages from './pages/Packages'

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
 
         {/*       <Route
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
