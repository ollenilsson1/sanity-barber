import React from 'react'
import Head from 'next/head'
import Header from '../../components/Header'
import Link from 'next/link'
import { sanityClient, urlFor } from '../../sanity'
import { Author } from '../../typings'

interface Props {
  authors: Author[]
}

function About({ authors }: Props) {
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Barber Stockholm - About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {/* About banner */}
      <div className="flex min-h-[250px] items-center justify-center border-y border-black bg-[url('../public/images/banners/aboutBanner.jpg')] bg-center py-10 text-white lg:py-2">
        <h1 className="max-w-xl font-serif text-6xl underline drop-shadow-2xl md:text-8xl">
          Our Barbers
        </h1>
      </div>
      {/* Authors */}
      <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-3 md:gap-6 lg:grid-cols-3 lg:p-6 ">
        {authors.map((author) => (
          <Link key={author._id} href={`/about/${author.slug.current}`}>
            <div className="group cursor-pointer overflow-hidden rounded-lg border h-max">
              <img
                className="h-120 w-full object-contain transition-transform duration-200 ease-in-out group-hover:scale-105"
                src={urlFor(author.image).url()!}
                alt=""
              />
              <div className="flex justify-between bg-white p-5">
                <div>
                  <p className="text-lg font-bold">{author.name}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default About

export const getServerSideProps = async () => {
  const query = `*[_type == "author" ]{
        _id,
        name,
        slug,
        image,
        bio,
      }`

  const authors = await sanityClient.fetch(query)

  return {
    props: {
      authors,
    },
  }
}
