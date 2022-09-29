import { Button, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import PlayerResultCard from "../../components/PlayerResultCard";
import { FaSearch } from 'react-icons/fa';
import { useRouter } from "next/router";

import prisma from '../../services/PrismaService.js';
import Head from "next/head";

export default function ArmoryIndex({ players }) {
    const router = useRouter();

    const [ searchTarget, setSearchTarget ] = useState("");
    const [ error, setError ] = useState("");
    const [ searchProcessing, setSearchProcessing ] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        
        if (!searchProcessing) {
            setSearchProcessing(true);

            const targetUuid = (await (await fetch(`/api/minecraft/fromName/${searchTarget}`)).json()).uuid;
        
            if (targetUuid) {
                setError("");

                router.push(`/armory/${targetUuid}`);
            } else {
                setError(`We couldn't find a player with that username!`);
            }

            setSearchProcessing(false);
        }
    }

    return <>
        <Head>
            <title>Realm of Ejogar - Armory</title>
        </Head>

        <div className="p-3 flex flex-col gap-8 justify-center">
            <div className="flex-initial flex flex-col gap-2 items-start justify-center">
                <h1 className="text-3xl font-roboto font-bold text-white uppercase text-start">Search</h1>
                <form className="flex flex-col gap-4 w-full" onSubmit={handleSearch}>
                    <div>
                    <TextInput helperText={error != "" ? <span className="text-red-500">{error}</span> : ""} disabled={searchProcessing} icon={FaSearch} id="target" type="text" placeholder="Player username" value={searchTarget} onChange={(e) => setSearchTarget(e.target.value)} required={true}/>
                    </div>
                    <Button disabled={searchProcessing} className="px-4" type="submit">
                        {
                            searchProcessing ?
                            <>
                                <div className="mr-3">
                                    <Spinner size="sm" light={true}/>
                                </div>
                                <span>Searching...</span>
                            </>
                            :
                            <span>Search</span>
                        }
                    </Button>
                </form>
            </div>
            <div className="flex-initial flex flex-col gap-2 items-start justify-center">
                <h1 className="text-3xl font-roboto font-bold text-white uppercase">Players</h1>
                <div className="flex-initial grid grid-cols-1 md:grid-cols-4 grid-rows-auto items-center justify-center gap-4">
                    {
                        players?.length > 0 ?
                        players.map(ply => {
                            return <PlayerResultCard key={ply.uuid} Player={ply}/>
                        })
                        :
                        <p className="text-roboto text-xl text-white font-bold">There are no players to display!</p>
                    }
                </div>
            </div>
        </div>
    </>
}

export async function getStaticProps() {
    let _players = [];
    const plys = await prisma.userData.findMany({});

    for (let i = 0; i < plys.length; i++) {
        if (_players.findIndex(p => p.uuid == plys[i].uuid) == -1) {
            const plyName = (await (await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${plys[i].uuid}`)).json()).name;
            
            _players.push({
                name: plyName,
                uuid: plys[i].uuid,
                job: plys[i].job
            });
        }
    }

    return {
        props: {
            players: JSON.parse(JSON.stringify(_players))
        },
        revalidate: ((60 * 60) * 6)
    }
}