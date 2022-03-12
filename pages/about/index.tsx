import React from 'react'
import Head from 'next/head'
import Header from '../../components/Header'

function About() {
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Barber Stockholm - About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {/* About banner */}
      <div className="min-h-[250px] flex items-center justify-center text-white border-y border-black bg-[url('../public/images/banners/aboutBanner.jpg')] bg-center py-10 lg:py-2">
          <h1 className="max-w-xl font-serif text-6xl md:text-8xl drop-shadow-2xl underline">
            Our Barbers
          </h1>
      </div>


      </div>
  )
}

export default About