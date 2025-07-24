import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks/index"

export const Blogs = () => {

    const {loading, blogs} = useBlogs();

    if(loading){
        return <div>
            <Appbar /> <div className="flex justify-center">
                <div className="">
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
        </div></div>
    }
    // sttorein a state
    // store it directly here
    // store it in a context variable
    // create our own custom hooks called blogs
    return <div>
        <Appbar />
        <div className="p-4  max-w-screen-lg">
        <div className="ml-60">
            {blogs.map(blog => <BlogCard 
                    id={blog.id}
                    authorName={blog.author.name || "Anonymus"}
                    title={blog.title}
                    content={blog.content}
                    publishdate="2nd feb 2004"        
                />
             )}
        </div></div>
        
    </div>
}

export default Blogs;



            // <div className="flex justify-center max-w-xl">
                
            // </div>
            // <div className="flex justify-center max-w-xl">
            //     <BlogCard 
            //         authorName={"Akshay Jain"}
            //         title={"How an ugly Single-Page wwebsite Makes $5000 a month with affiliate marketing"}
            //         content={"How an ugly Single-Page  marketing How an ugly Single-Page wwebsite Makes $5000 a month with affiliate marketing"}
            //         publishdate="2nd feb 2004"        
            //     />
            // </div>
            // <div className="flex justify-center max-w-xl">
            //     <BlogCard 
            //         authorName={"Akshay Jain"}
            //         title={"How an ugly Single-Page wwebsite Makes $5000 a month with affiliate marketing"}
            //         content={"How an ugly Single-Page  marketing How an ugly Single-Page wwebsite Makes $5000 a month with affiliate marketing"}
            //         publishdate="2nd feb 2004"        
            //     />
            // </div>
            // <div className="flex justify-center max-w-xl">
            //     <BlogCard 
            //         authorName={"Akshay Jain"}
            //         title={"How an ugly Single-Page wwebsite Makes $5000 a month with affiliate marketing"}
            //         content={"How an ugly Single-Page  marketing How an ugly Single-Page wwebsite Makes $5000 a month with affiliate marketing"}
            //         publishdate="2nd feb 2004"        
            //     />
            // </div>
            // <div className="flex justify-center max-w-xl">
            //     <BlogCard 
            //         authorName={"Akshay Jain"}
            //         title={"How an ugly Single-Page wwebsite Makes $5000 a month with affiliate marketing"}
            //         content={"How an ugly Single-Page  marketing How an ugly Single-Page wwebsite Makes $5000 a month with affiliate marketing"}
            //         publishdate="2nd feb 2004"        
            //     />
            // </div>
            // <div className="flex justify-center max-w-xl">
            //     <BlogCard 
            //         authorName={"Akshay Jain"}
            //         title={"How an ugly Single-Page wwebsite Makes $5000 a month with affiliate marketing"}
            //         content={"How an ugly Single-Page  marketing How an ugly Single-Page wwebsite Makes $5000 a month with affiliate marketing"}
            //         publishdate="2nd feb 2004"        
            //     />
            // </div>