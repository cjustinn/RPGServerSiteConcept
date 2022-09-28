import ReactMarkdown from "react-markdown";

import prisma from '../../services/PrismaService.js';

import Image from "next/image";
import Head from "next/head.js";

export default function NewsArticle({ article, posterName }) {
    return <>
        <Head>
            <title>Realm of Ejogar - {article.title}</title>
        </Head>

        <div className="p-6">
            <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 flex flex-col gap-6">
                <div className="flex-1 flex flex-row gap-2 items-center cursor-default">
                    <Image src={`https://crafatar.com/avatars/${article.author}?size=64&overlay=true`} height={64} width={64}/>
                    <div className="flex-1 flex flex-col gap-0">
                        <h1 className="text-3xl text-white font-bold font-roboto uppercase">{article.title}</h1>
                        <p className="text-md text-gray-500 font-light font-roboto">Posted by {posterName}</p>
                    </div>
                </div>

                <hr className="border-zinc-800"/>
                
                <ReactMarkdown className="text-gray-200 font-roboto font-light text-md">
                    {article.content}
                </ReactMarkdown>

                <hr className="border-zinc-800"/>

                <p className="text-md text-gray-500 font-light font-roboto">Posted on {new Date(article.posted).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</p>
            </div>
        </div>
    </>
}

export async function getServerSideProps(context) {
    const { id } = context.query;

    const _article = await prisma.newsArticle.findFirst({
        where: {
            id: parseInt(id)
        }
    });

    const name = (await (await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${_article?.author}`)).json()).name;

    console.log(name);

    return {
        props: {
            article: JSON.parse(JSON.stringify(_article)),
            posterName: name
        }
    };
}