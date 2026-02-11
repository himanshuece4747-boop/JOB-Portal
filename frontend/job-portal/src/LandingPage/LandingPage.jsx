import React from 'react'
import Analytics from './components/Analytics'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Footer from './components/Footer'
import { Briefcase } from 'lucide-react'

const LandingPage = () => {
  return (
    <div className='min-h-screen'>
      <Header />
      <Hero />
      <Features/> 
      <Analytics />
      <Footer />
    </div>
  )
}

export default LandingPage