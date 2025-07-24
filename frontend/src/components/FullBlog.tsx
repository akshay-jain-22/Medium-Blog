import { Appbar } from "./Appbar";
import type { Blog } from "../hooks";
import { LoremIpsum } from 'lorem-ipsum';
import { Avatar} from "./BlogCard";

// Initialize LoremIpsum instance
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

export const FullBlog = ({ blog }: { blog: Blog }) => {
  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <div className="">
            <Appbar />
        </div>
      <div className="grid grid-cols-10 px-10 w-full pt-8">
        <div className="col-span-7 bg-red200 pt-30">
          <div className="text-5xl font-extrabold">
            {blog.title}
          </div>
          <div className="text-slate-400 pt-3">
            Posted on 2nd Dec 2024
          </div>
          <div className="font-thin pt-3">
            {blog.content}
            <p>{lorem.generateParagraphs(1)}</p>
          </div>
        </div>
        <div className="col-span-3">
            <div className="text-slate-500">
                Author
            </div>
            <div className="grid grid-cols-10 p-2 ">
                <div className="pr-80  col-span-1  flex flex-col justify-center">
                    {/* <Circle size = {24}/> */}
                    <Avatar size="big" name={blog.author.name || "Anonymus"} />
                </div>
                <div className="pl-4 col-span-9">
                    <div className="pb-2 font-extrabold">
                        {blog.author.name || "Anonymus"}
                    </div>
                    <div className="text-slate-500">
                        Randdom catch phrase obout the authors ability to the users attraction
                    </div>
                </div>  
                
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
