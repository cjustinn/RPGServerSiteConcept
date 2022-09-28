import Link from "next/link";

export default function RecentArticleCard(props) {
    // Props -> Article

    return <Link href={`/news/${props.Article.id}`}>
        <div className="rounded-md border border-zinc-800 p-4 flex flex-col gap-3 cursor-pointer transition duration-300 hover:border-amber-400" style={{
            backgroundImage: `url(${props.Article.header})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}>
            <p className="text-white text-lg font-bold font-roboto drop-shadow-[0_0px_5px_rgba(0,0,0,0.5)]">{props.Article.title}</p>
            <p className="text-gray-400 mt-auto text-md font-light font-roboto drop-shadow-[0_0px_5px_rgba(0, 0, 0, 0.5)]">
                {new Date(props.Article.posted).toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
        </div>
    </Link>
}