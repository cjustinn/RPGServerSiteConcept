import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';

export default function ProfessionProgressCard(props) {
    // Props -> Name, percentage
    return <div className="p-4 bg-zinc-800 grid grid-rows-1 grid-cols-4 rounded-xl border-2 border-zinc-600 items-center text-start cursor-default transition duration-300 hover:border-amber-500">
        <div className="col-span-3">
            <p className="text-2xl font-bold font-roboto uppercase text-white">{props.name}</p>
            <p className="text-lg font-light font-roboto text-gray-400">Started {new Date(props.started).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })}</p>
        </div>
        <div className="col-span-1">
            <CircularProgressbarWithChildren 
            value={props.percentage} 
            maxValue={50} 
            circleRatio={1}
            styles={buildStyles({
                strokeLinecap: "butt",
                trailColor: "#6b7280",
                pathColor: props.percentage >= process.env.MAX_LEVEL ? '#fcd34d' : '#a1a1aa'
            })}>
                <span className={`text-4xl font-bold`} style={{ color: `${props.percentage >= process.env.MAX_LEVEL ? '#fcd34d' : '#a1a1aa'}` }}>{props.percentage}</span>
            </CircularProgressbarWithChildren>
        </div>
    </div>
}