import React from 'react'
import Analytics from './components/Analytics'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import { Briefcase } from 'lucide-react'

const LandingPage = () => {
  return (
    <div className='min-h-screen mb-[100vh]'>
      <Header />
      <Hero />
      <Features/>
      <Analytics />
    </div>
  )
}

export default LandingPage