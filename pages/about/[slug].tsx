import { GetStaticProps } from 'next'
import Head from 'next/head'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Author } from '../../typings'
import PortableText from 'react-portable-text'

interface Props {
  author: Author
}

function SingleAuthor({ author }: Props) {
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Barber Stockholm - {author.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        {/* Sub-Header */}
        <div className="top relative h-64 w-full overflow-hidden bg-blue-600">
          <img
            src="https://images.unsplash.com/photo-1497384401032-2182d2687715?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
            className="bg absolute z-0 h-full w-full object-cover object-center"
          />
          <div className="relative flex h-full flex-col items-center justify-center bg-black bg-opacity-50 text-white">
            <img
              src={urlFor(author.image).url()!}
              className="h-24 w-24 rounded-full object-cover"
            />
            <h1 className="text-2xl font-semibold">{author.name}</h1>
            {/* Lägg instagram och facebook ikoner*/}
            <h4 className="text-sm font-semibold">Joined Since '19</h4>
          </div>
        </div>
        {/* more info */}
        <div className="mx-auto h-screen max-w-3xl p-5">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={author.bio}
            serializers={{
              h1: (props: any) => (
                <h1 className="my-5 text-2xl font-bold" {...props} />
              ),
              h2: (props: any) => (
                <h1 className="my-5 text-xl font-bold" {...props} />
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              link: ({ href, children }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </main>
    </div>
  )
}

export default SingleAuthor

export const getStaticPaths = async () => {
  const query = `*[_type == "author"]{
        _id,
        slug {
        current
      }
      }`

  const authors = await sanityClient.fetch(query)

  const paths = authors.map((author: Author) => ({
    params: {
      slug: author.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "author" && slug.current == $slug][0]{
        _id,
      name,
      slug,
      image,
      bio,
      }`

  const author = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  /* because fallback:blocking return notFound object to trigger 404 page if author not found */
  if (!author) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      author,
    },
  }
}
