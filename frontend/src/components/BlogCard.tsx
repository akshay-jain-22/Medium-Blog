import { Link } from "react-router-dom";

interface BlogCardProps {
    id:number;
    authorName: string;
    title: string;
    content: string;
    publishdate: string; 
}



export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishdate
}: BlogCardProps ) => {
    return <Link to={`/blog/${id}`}>
    <div className=" max-w-screen-md cursor-pointer w-screen border-b border-slate-200 p-4 pb-4 ">
        <div className="flex">
            <div className="flex justify-center flex-col">
                <Avatar name={authorName} />
            </div>
            <div className="font-extralight pl-2">
                {authorName}
            </div>
            <div className="flex justify-center flex-col pl-2">
                <Circle size={1}></Circle>
            </div>
            <div className="pl-2 font-thin text-slate-400">
               {publishdate}
            </div>
        </div>
        <div className="font-extrabold text-xl pt-2">
            {title}
        </div>
        <div className="font text-sm">
            {content.slice(0,3000) + "..."}
        </div>
        {/* <br></br> */}
        <div className="text-xs text-slate-500 pt-7 pl-3">
            {`${Math.ceil(content.length/100)} minutes`}
        </div>
        <div className="bg-slate-200 h-l w-full">

        </div>
    </div></Link>
}

export default BlogCard;

export function Circle({size=1}:{size:number}){
    return (<div className={" rounded-full bg-slate-300"}
            style={{ width: `${size}px`,height: `${size}px`}}>

        </div>
    );
}


export function Avatar({name,size="small"}: {name: string ,size?: string} ) {
    return <div className={`"relative inline-flex items-center justify-center ${size === "small" ? "w-6 h-6" : "w-9 h-9"} h-${size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-white decoration-white`}>{name[0]}</span>

    </div>

}
