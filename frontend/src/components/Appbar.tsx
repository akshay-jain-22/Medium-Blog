import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"


export const Appbar = () =>{
    return <div className="w-full flex justify-between items-center font-semibold border-b  px-10 py-3">
        
        <div className="cursor-pointer">
            <Link to ={'/blogs'}>
            Medium
            </Link>
        </div>
        <div className="flex gap-4 pt-3">
            <Link to={'/publish'}>
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">NewBlog
                </button>
            </Link>
            <div className="ml-auto">
                <Avatar size="big" name="Akshay"></Avatar>
            </div>
        </div>
    </div>
}