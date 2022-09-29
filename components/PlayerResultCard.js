import Image from "next/image";
import Link from "next/link";

export default function PlayerResultCard(props) {
    // Props -> Player

    return <Link href={`/armory/${props.Player.uuid}`}>
        <div className="cursor-pointer transition duration-500 hover:border-amber-600 p-4 bg-zinc-900 rounded-lg border border-zinc-800 grid grid-cols-3 grid-rows-1 gap-2 items-center justify-center">
            <div className="col-span-1">
                <Image src={`https://crafatar.com/avatars/${props.Player.uuid}?size=512&overlay=true`} width={128} height={128}/>
            </div>
            <div className="col-span-2 flex flex-col items-start justify-center">
                <p className="font-roboto font-bold text-2xl text-white">{props.Player.name}</p>
                <p className="font-roboto font-light text-lg text-gray-300">{props.Player.job}</p>
            </div>
        </div>
    </Link>
}