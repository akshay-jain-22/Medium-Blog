import { useEffect,useState } from "react";
import axios from "axios"
import { BACKEND_URL } from "../config"
export interface Blog{
    "content": string,
    "title": string,
    "id": number,
    "author": {
        "name": string
    }
}

export const useBlog = ({ id }: { id:string }) => {
    const [loading, setloading] = useState(true);
    const [blog,setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get( `${BACKEND_URL}/api/v1/blog/${id}`,{
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(response => {
            setBlog(response.data.blog)
            setloading(false);
        })
    }, [])

    return {
        loading,
        blog
    }
}

export const useBlogs = () => {

    const [loading, setloading] = useState(true);
    const [blogs,setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get( `${BACKEND_URL}/api/v1/blog/bulk`,{
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(response => {
            setBlogs(response.data.blogs)
            setloading(false);
        })
    }, [])

    return {
        loading,
        blogs
    }
 }