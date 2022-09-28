import Head from 'next/head';
import Image from 'next/image';

import { GiAxeSword, GiWarPick } from 'react-icons/gi';
import { Tooltip } from 'flowbite-react';

import ProfessionProgressCard from '../../components/ProfessionProgressCard';

import styles from '../../styles/Profile.module.css';
import PlayerGearComponent from '../../components/PlayerGearComponent';

import prisma from '../../services/PrismaService.js';

function JobData(_job, _level, _experience, _start) {
    this.name = _job;
    this.level = _level;
    this.exp = _experience;
    this.started = _start;
}

function calculateGearScore(items, filter) {
    let score = 0;

    let count = 0;
    for (let i = 0; i < items.length; i++) {
        if (filter.findIndex(f => items[i].item_type.toLowerCase().endsWith(f.toLowerCase())) > -1) {
            score += items[i].base_gear_score;
            for (let j = 0; j < items[i].enchantments.length; j++) {
                score += items[i].enchantments[j].gear_score;
            }

            count++;
        }
    }

    return score > 0 ? Math.ceil(score / count) : score;
}

const Profile = ({ professions, userData, gear }) => {
    return <>
    <Head>
        <title>Realm of Ejogar - {userData.playerName}</title>
    </Head>
    
        <div className="grid grid-rows-auto grid-cols-1 md:grid-cols-3 gap-4 mx-auto px-4 py-4">
            <div className="col-span-1 md:col-span-3">
                <div className="grid grid-cols-2 grid-rows-1 gap-4">
                    <div className="flex flex-row gap-4">
                        <Image src={`https://crafatar.com/avatars/${userData.uuid}?size=75`} width={75} height={75} />
                        <div className="flex flex-col items-start">
                            <h1 className="my-0 text-transparent bg-clip-text bg-gradient-to-b from-amber-700 to-amber-400 font-bold font-medieval text-4xl cursor-default drop-shadow-[0_0px_3px_rgba(0,0,0,0.5)]">{userData.playerName}</h1>
                            {
                                professions.length >= 1 ?
                                <p className="my-0 font-light font-roboto text-gray-300 text-start">Level {professions[0].level} {professions[0].name}</p>
                                :
                                <p className="my-0 font-light font-roboto text-gray-300 text-start">Player has no professions.</p>
                            }
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-end">
                        <Tooltip trigger='hover' placement='left' style='dark' content={`This is ${userData.playerName}'s average tool gear score.`}>
                            <div className="flex items-center pr-2 text-start font-bold cursor-default text-amber-600 hover:text-amber-700 font-roboto uppercase text-xl mb-2">
                                <span>{calculateGearScore(gear, [ '_Hoe', '_Axe', '_Shovel', '_Pickaxe' ])}</span>
                                <GiWarPick className="text-2xl ml-2"/>
                            </div>
                        </Tooltip>
                        <Tooltip trigger='hover' placement='left' style='dark' content={`This is ${userData.playerName}'s average combat gear score.`}>
                            <div className="flex items-center pr-2 text-start font-bold cursor-default text-amber-600 hover:text-amber-700 font-roboto uppercase text-xl mb-2">
                                <span>{calculateGearScore(gear, [ '_Axe', '_Sword', '_Chestplate', '_Helmet', '_Leggings', '_Boots', '_Shield', 'Bow', 'Crossbow' ])}</span>
                                <GiAxeSword className="text-2xl ml-2"/>
                            </div>
                        </Tooltip>
                    </div>
                </div>
            </div>

            {/* Player gear data */}
            <div className="col-span-1 order-2 md:order-1 text-center">
                <p className="text-start text-white font-roboto uppercase drop-shadow-[0_0px_3px_rgba(0,0,0,0.5)] text-3xl pb-0">Player Gear</p>

                {
                    gear?.length > 0 ?
                    <>
                        <PlayerGearComponent Items={gear.filter(g => g.item_type.toLowerCase().endsWith('_helmet') || g.item_type.toLowerCase().endsWith('_chestplate') || g.item_type.toLowerCase().endsWith('_leggings') || g.item_type.toLowerCase().endsWith('_boots'))}/>
                <PlayerGearComponent Items={gear.filter(g => g.item_type.toLowerCase().endsWith('_sword') || g.item_type.toLowerCase().endsWith('bow') || g.item_type.toLowerCase().endsWith('_axe'))}/>
                <PlayerGearComponent Items={gear.filter(g => g.item_type.toLowerCase().endsWith('_pickaxe') || g.item_type.toLowerCase().endsWith('_shovel') || g.item_type.toLowerCase().endsWith('_hoe'))}/>
                    </>
                    :
                    <p className="text-start font-light text-gray-300 font-roboto drop-shadow-[0_0px_3px_rgba(0,0,0,0.5)] text-md">This player has no equipped gear.</p>
                }
            </div>
            
            {/* Player image */}
            <div className="col-span-1 order-1 md:order-2 text-center">
                <Image src={`https://crafatar.com/renders/body/${userData.uuid}?scale=10`} width={180} height={405} />
            </div>
            
            {/* Player profession data */}
            <div className="col-span-1 order-3 text-center">
                <p className="text-start md:text-end text-white font-roboto uppercase drop-shadow-[0_0px_3px_rgba(0,0,0,0.5)] text-3xl mb-2">Professions</p>
                <div className="grid grid-cols-1 grid-rows-auto gap-4">
                    {
                        professions.length > 0 ?
                        professions.map(_p => {
                            return <ProfessionProgressCard name={_p.name} percentage={_p.level} started={_p.started} />
                        })
                        :
                        <p className="text-end font-light text-gray-300 font-roboto drop-shadow-[0_0px_3px_rgba(0,0,0,0.5)] text-md">{userData.playerName} has no professions!</p>
                    }
                </div>
            </div>
        </div>
        <div className={styles.backgroundimg}></div>
    </>

}

export async function getServerSideProps(context) {
    const { uuid } = context.query;

    let userJobs = [];
    const targetProfessionData = await prisma.userData.findMany({
        where: {
            uuid: uuid
        }
    });

    for (let i = 0; i < targetProfessionData.length; i++) {
        const jobData = await prisma.jobData.findFirst({
            where: {
                uuid: targetProfessionData[i].uuid,
                job: targetProfessionData[i].job
            },
            select: {
                level: true,
                experience: true,
                started: true
            }
        });

        userJobs.push(new JobData(targetProfessionData[i].job, jobData.level, jobData.experience, new Date(jobData.started)));
    }

    // Get username
    const userName = await (await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`)).json();

    // Get player gear.
    const baseGear = await prisma.playerGear.findMany({
        where: {
            item_owner: uuid
        },
        include: {
            enchantments: true
        }
    });

    return {
        props: {
            professions: JSON.parse(JSON.stringify(userJobs)),
            userData: JSON.parse(JSON.stringify({
                playerName: userName.name,
                uuid: uuid
            })),
            gear: JSON.parse(JSON.stringify(baseGear))
        }
    };
}

export default Profile;