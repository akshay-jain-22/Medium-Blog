import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks"
import { useParams  } from "react-router-dom"
import { Spinner } from "../components/Spinner";
import { Appbar } from "../components/Appbar";

export const Blog = () => {
  const { id } = useParams();
  const {loading,blog} = useBlog({
    id: id || ""
  });
  if(loading){
    return <div> <Appbar />
      <div className="h-screen flex flex-col justify-center">
      <div className="flex justify-center">
        <Spinner />
      </div>
    </div></div>
  }
  return (
    <div>
      {blog && <FullBlog blog={blog} />}
    </div>
  );
}

export default Blog;