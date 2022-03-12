import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typings'

interface Props {
  posts: Post[]
}

export default function Home({ posts }: Props) {
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Barber Stockholm</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {/* First banner */}
      <div className="flex items-center justify-between text-white border-y border-black bg-[url('../public/images/banners/banner1.jpg')] bg-cover py-10 lg:py-2">
        <div className="space-y-5 px-10">
          <h1 className="max-w-xl font-serif text-6xl">
            <span className="underline decoration-white decoration-4">
              Barber Sthlm
            </span>{' '}
            - We bring you nostalgia with a modern twist
          </h1>
          <h2>
          Serving Stockholm since 1896 - that's over 125 years’ experience in making your first impression count.
          </h2>
        </div>
        <div>
          <img
            className="hidden h-32 md:inline-flex lg:h-full "
            src="/images/logos/barberSthlmSmallIcon.png"
            alt=""
          />
        </div>
      </div>
      {/* Posts */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 lg:p-6 ' >
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className='border rounded-lg group cursor-pointer overflow-hidden'>
              <img className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out' src={urlFor(post.mainImage).url()!} alt="" />
              <div className='flex justify-between p-5 bg-white'>
                <div>
                  <p className='text-lg font-bold'>{post.title}</p>
                  <p className='text-xs'>
                    {post.description} by {post.author.name}
                  </p>
                </div>

                <img className='h-12 w-12 rounded-full' src={urlFor(post.author.image).url()!} alt="" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    author -> {
    name,
    image
  },
  description,
  mainImage,
  slug
  }`

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    },
  }
}
