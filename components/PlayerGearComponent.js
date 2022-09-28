import Image from "next/image"

import { Modal, Tooltip } from 'flowbite-react';
import { GiAxeSword, GiWarPick } from 'react-icons/gi';

import { useState } from "react";

function SplitTypeToString(type) {
    let str = "";

    const parts = type.split('_');
    for (let i = 0; i < parts.length; i++) {
        str += `${parts[i].substring(0,1).toUpperCase()}${parts[i].substring(1).toLowerCase()}${i == (parts.length - 1) ? '' : ' '}`;
    }

    return str;
}

export default (props) => {
    // Props -> Items
    const [ open, setOpen ] = useState(false);
    const [ values, setValues ] = useState({
        name: "N/A",
        gearScore: -1,
        baseScore: -1,
        enchantments: [],
        type: "wooden_pickaxe"
    })

    return <>
        <div className="p-4 grid grid-rows-auto grid-cols-5 gap-2">
            {
                props.Items?.length >= 0 ?
                props.Items.map(item => {
                    let score = item.base_gear_score;
                    for (let i = 0; i < item.enchantments.length; i++) {
                        score += item.enchantments[i].gear_score;
                    }

                    let borderColor = "border-gray-400";
                    if (score >= 75 && score < 100) { borderColor = "border-lime-400"; }
                    else if (score >= 100 && score < 125) { borderColor = "border-fuchsia-500"; }
                    else if (score >= 125) { borderColor = "border-amber-500"; }

                    return <Tooltip style='dark' placement='top-start' content={`${item.item_name}`}>
                        <div key={item.id} className={`p-2 bg-zinc-800 rounded-lg border-2 ${borderColor} hover:scale-105 transition duration-500 cursor-pointer`}>
                            <Image src={`/${item.item_type.toLowerCase()}.png`} height={48} width={48} onClick={() => {
                                setValues({
                                    name: item.item_name,
                                    baseScore: item.base_gear_score,
                                    gearScore: score,
                                    enchantments: item.enchantments,
                                    type: item.item_type
                                });

                                setOpen(true);
                            }}/>
                        </div>
                    </Tooltip>
                })
                :
                <p className="text-lg font-roboto uppercase text-gray-300">This player has no gear to display.</p>
            }
        </div>
        <Modal show={open} onClose={() => setOpen(false)} size='sm'>
            <Modal.Header>
                <div className="flex flex-col cursor-default">
                    <span className="font-roboto font-bold uppercase text-2xl">{values.name}</span>
                    <span className="font-roboto font-light text-xl text-amber-500 flex flex-row gap-1 flex-inherit items-center">
                        <GiAxeSword/>
                        {values.gearScore}
                    </span>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="flex flex-col gap-4 cursor-default">
                    <div>
                        <p className="text-bold text-xl text-gray-400 uppercase">Type</p>
                        <p className="text-lg text-gray-200">{SplitTypeToString(values.type)}</p>
                        <div className="flex-inherit flex flex-row gap-1 text-roboto text-md items-center text-amber-500">
                            <GiAxeSword/>
                            {values.baseScore}
                        </div>
                    </div>

                    <div>
                        <p className="text-bold text-xl text-gray-400 uppercase">Enchantments</p>
                        <div className="flex flex-col gap-1">
                            {
                                values.enchantments.length > 0 ?
                                values.enchantments.map(enc => {
                                    return <div>
                                        <span className="text-bold text-lg text-gray-200">{enc.enchantment_name}</span>
                                        <div className="flex-inherit flex flex-row gap-1 text-roboto text-md items-center text-amber-500">
                                            <GiAxeSword/>
                                            {enc.gear_score}
                                        </div>
                                    </div>
                                })
                                :
                                <p className="text-bold text-lg text-gray-200">This item has no enchantments.</p>
                            }
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </>
}