import { Navbar } from 'flowbite-react';
import Link from 'next/link';
import { useState } from 'react';

import { GiHamburgerMenu } from 'react-icons/gi';

export default () => {
    const [ open, setOpen ] = useState(false);

    return <nav className="p-2 w-full bg-gradient-to-t from-zinc-900 via-zinc-900 to-zinc-800 border-b border-neutral-700">
        <div className="flex flex-row items-center">
            <div className="flex-initial text-start">
                <Link href="/">
                    <span className="px-2 text-transparent bg-clip-text bg-gradient-to-b from-amber-700 to-amber-400 font-bold font-medieval uppercase text-xl hover:to-amber-200 cursor-pointer">Realm of Ejogar</span>
                </Link>
            </div>
            <div className="flex-1 text-end items-center block md:hidden">
                <button onClick={() => setOpen(!open)}><GiHamburgerMenu className="cursor-pointer text-2xl text-white hover:text-gray-100"/></button>
            </div>
            <div className="flex-1 text-end items-end hidden md:block">
                <Link href="/">
                    <span className="px-2 text-transparent bg-clip-text bg-gradient-to-b from-amber-700 to-amber-400 font-bold font-roboto uppercase text-xl hover:to-amber-200 cursor-pointer">Home</span>
                </Link>
                <Link href="/news">
                    <span className="px-2 border-l border-l-neutral-700 text-transparent bg-clip-text bg-gradient-to-b from-amber-700 to-amber-400 font-bold font-roboto uppercase text-xl hover:to-amber-200 cursor-pointer">News</span>
                </Link>
                <Link href="/professions">
                    <span className="px-2 border-l border-l-neutral-700 text-transparent bg-clip-text bg-gradient-to-b from-amber-700 to-amber-400 font-bold font-roboto uppercase text-xl hover:to-amber-200 cursor-pointer">Professions</span>
                </Link>
                <Link href="/armory">
                    <span className="px-2 border-l border-l-neutral-700 text-transparent bg-clip-text bg-gradient-to-b from-amber-700 to-amber-400 font-bold font-roboto uppercase text-xl hover:to-amber-200 cursor-pointer">Armory</span>
                </Link>
            </div>
        </div>
        <div className={`flex flex-col py-2 bg-neutral-800 text-end ${open ? 'block' : 'hidden'} md:hidden`}>
            <Link href="/">
                <span className="px-2 text-transparent bg-clip-text bg-gradient-to-b from-amber-700 to-amber-400 font-bold font-roboto uppercase text-xl hover:to-amber-200 cursor-pointer">Home</span>
            </Link>
            <Link href="/news">
                <span className="px-2 border-l border-l-neutral-700 text-transparent bg-clip-text bg-gradient-to-b from-amber-700 to-amber-400 font-bold font-roboto uppercase text-xl hover:to-amber-200 cursor-pointer">News</span>
            </Link>
            <Link href="/professions">
                <span className="px-2 border-l border-l-neutral-700 text-transparent bg-clip-text bg-gradient-to-b from-amber-700 to-amber-400 font-bold font-roboto uppercase text-xl hover:to-amber-200 cursor-pointer">Professions</span>
            </Link>
            <Link href="/armory">
                <span className="px-2 border-l border-l-neutral-700 text-transparent bg-clip-text bg-gradient-to-b from-amber-700 to-amber-400 font-bold font-roboto uppercase text-xl hover:to-amber-200 cursor-pointer">Armory</span>
            </Link>
        </div>
    </nav>
}