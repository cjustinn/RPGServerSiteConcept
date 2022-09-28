import Head from "next/head";
import prisma from "../services/PrismaService";

function ProfessionCard(props) {
    // Props -> profession
    return <>
        <Head>
            <title>Realm of Ejogar - Professions</title>
        </Head>

        <div className="p-4 rounded-md bg-zinc-900 border border-zinc-800 flex flex-col gap-4 cursor-default transition duration-300 hover:border-amber-600">
            <div className="flex-1 flex flex-col gap-0">
                <h1 className="text-white text-xl font-roboto font-bold uppercase">{props.profession.job_name}</h1>
                <p className="text-zinc-500 text-md font-roboto font-light">{props.profession.expansion.title}</p>
            </div>

            <hr className="border-zinc-800" />

            <p className="text-zinc-300 text-md font-roboto">
                {props.profession.job_desc}
            </p>
        </div>
    </>
}

export default function ProfessionsPage({ professions }) {
    return <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-auto gap-6">
            <div className="md:col-span-2 text-center flex flex-col gap-2 items-center justify-center">
                <h1 className="text-white font-raleway font-bold text-3xl">What are professions?</h1>
                <p className="w-full md:w-2/3 text-zinc-400 font-roboto font-light text-lg">
                    In the Realm of Ejogar, players can select one or more professions which will dictate how they generate an income, aside from owning and maintaining a shop. Every profession has two or more attributes which give them bonuses relating to their industry, such as increased drop yields or experience gain; some professions also have passive attributes, such as durability damage reductions. By performing your professions non-passive attributes you will earn in-game money as well as profession experience allowing you to level up in your profession, which in turn increases the effectiveness and scale of your profession's bonuses.
                </p>
            </div>

            <hr className="md:col-span-2 border-zinc-800"/>

            <h1 className="md:col-span-2 text-white font-raleway font-bold text-3xl">Playable Professions</h1>
            {
                professions.map(_p => {
                    return <ProfessionCard key={_p.id} profession={_p}/>
                })
            }
        </div>
    </div>
}

export async function getStaticProps() {

    const _profs = await prisma.job.findMany({
        include: {
            expansion: {
                select: {
                    title: true
                }
            }
        }
    })

    return {
        props: {
            professions: JSON.parse(JSON.stringify(_profs))
        },
        revalidate: ((60 * 60) * 24)
    }
}