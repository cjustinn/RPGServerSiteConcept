import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import prisma from '../services/PrismaService'
import RecentArticleCard from '../components/RecentArticleCard'

export async function getStaticProps() {
  const lg = await prisma.newsArticle.findMany({
    where: {
      displayLarge: true
    },
    select: {
      id: true,
      title: true,
      preview: true,
      header: true
    }
  });
  
  const recent = await prisma.newsArticle.findMany({
    select: {
      id: true,
      title: true,
      preview: true,
      header: true,
      posted: true
    },
    orderBy: {
      posted: 'desc'
    },
    take: 5
  });

  const homeCards = await prisma.landingCard.findMany({
    include: {
      landingCardButton: true
    }
  });

  return {
    props: {
      largeArticles: JSON.parse(JSON.stringify(lg)),
      latestArticles: JSON.parse(JSON.stringify(recent)),
      homePageCards: JSON.parse(JSON.stringify(homeCards))
    },
    revalidate: (60 * 60) * 4
  };
}

export default function Home({ largeArticles, latestArticles, homePageCards }) {

  return (
    <>
      <Head>
        <title>Realm of Ejogar</title>
      </Head>

      <div className="flex flex-col gap-8">
        <div className="flex-1 flex flex-col p-4">
          <h1 className="text-white font-raleway text-xl">Recent News</h1>
          <div className="flex-1 grid py-2 grid-cols-1 md:grid-cols-5 grid-rows-auto gap-4">
            {
              latestArticles.map(article => {
                return <RecentArticleCard key={article.id} Article={article}/>
              })
            }
          </div>
        </div>
        <div className="flex-1 grid py-2 grid-cols-1 grid-rows-auto gap-1">
          {
            homePageCards.map(card => {
              return <div key={card.id} className="p-8 flex flex-col gap-6 overflow-x-hidden overflow-y-hidden border-y border-zinc-800" style={{
                backgroundImage: `url(${card.header})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}>
                <h1 className="text-white font-bold font-roboto text-5xl drop-shadow-[0_0px_5px_rgba(0,0,0,1)]">{card.title}</h1>
      
                <p className="w-full md:w-1/2 text-white font-light font-roboto text-lg drop-shadow-[0_0px_5px_rgba(0,0,0,1)]">{card.preview}</p>

                <div className="flex-1 flex flex-row gap-3">
                  {
                    card.landingCardButton.map(btn => {
                      const linkIsInternal = btn.button_link.startsWith("/");

                      if (linkIsInternal) {
                        return <Link key={btn.button_text} href={btn.button_link}>
                          <span className="cursor-pointer px-8 py-3 rounded-sm bg-zinc-900 border border-amber-600 uppercase bg-opacity-50 transition duration-200 hover:bg-opacity-100 hover:bg-amber-700 hover:text-amber-300 text-amber-500 font-roboto">
                            {btn.button_text}
                          </span>
                        </Link>
                      } else {
                        return <a key={btn.button_text} href={btn.button_link} target="_blank" rel='noreferrer'>
                          <span className="cursor-pointer px-8 py-3 rounded-sm bg-zinc-900 border border-amber-600 uppercase bg-opacity-50 transition duration-200 hover:bg-opacity-100 hover:bg-amber-700 hover:text-amber-300 text-amber-500 font-roboto">
                            {btn.button_text}
                          </span>
                        </a>
                      }
                    })
                  }
                </div>
              </div>
            })
          }
          {
            largeArticles.map(article => {
              return <div key={article.id} className="p-8 flex flex-col gap-6 overflow-x-hidden overflow-y-hidden border-y border-zinc-800" style={{
                backgroundImage: `url(${article.header})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}>
                <h1 className="text-white font-bold font-roboto text-5xl drop-shadow-[0_0px_5px_rgba(0,0,0,1)]">{article.title}</h1>
      
                <p className="w-full md:w-1/2 text-white font-light font-roboto text-lg drop-shadow-[0_0px_5px_rgba(0,0,0,1)]">{article.preview}</p>
      
                <div className="flex-1 flex flex-row gap-3">
                  <Link href={`/news/${article.id}`}>
                    <span className="cursor-pointer px-8 py-3 rounded-sm bg-zinc-900 border border-amber-600 uppercase bg-opacity-50 transition duration-200 hover:bg-opacity-100 hover:bg-amber-700 hover:text-amber-300 text-amber-500 font-roboto">
                      Read Now
                    </span>
                  </Link>
                </div>
              </div>
            })
          }
        </div>
      </div>
    </>
  )
}
