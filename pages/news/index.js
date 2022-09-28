import prisma from '../../services/PrismaService.js';
import RecentArticleCard from "../../components/RecentArticleCard";
import Head from 'next/head.js';

export default function NewsIndex({ articles }) {
    return <>
        <Head>
            <title>Realm of Ejogar - News</title>
        </Head>

        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto gap-4">
                <div className="md:col-span-4">
                    <h1 className="text-white font-raleway text-3xl font-bold">All News Articles</h1>
                </div>

                {
                    articles.map(_a => {
                        return <RecentArticleCard Article={_a}/>
                    })
                }
            </div>
        </div>
    </>
}

export async function getStaticProps() {
    const _articles = await prisma.newsArticle.findMany({
        select: {
            id: true,
            title: true,
            posted: true,
            header: true
        }
    });

    return {
        props: {
            articles: JSON.parse(JSON.stringify(_articles))
        },
        revalidate: (60 * 60) * 2
    }
}