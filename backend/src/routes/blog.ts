
import { Hono } from "hono";
import { Bindings } from "hono/types";
import { verify } from "hono/jwt";
// import { PrismaClient } from "@prisma/client/extension";
import { PrismaClient } from "../generated/prisma/edge";

import { withAccelerate } from "@prisma/extension-accelerate";
import { connect } from "mongoose";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: string;
  }
}>()

blogRouter.use("/", async(c,next) =>{
    const authHeahder = c.req.header("Authorization") || "";
    const user = await verify(authHeahder,c.env.JWT_SECRET);
    if(user){
        c.set("userId", String(user.id));
        await next();
    }
    else{
        c.status(403);
        return c.json({
            message: "you not logged in"
        })
    }
})

blogRouter.post("/",async(c) => {
    const body = await c.req.json();
    const authorid = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authorid)
        }
    })
    return c.json({
        id: blog.id
    })
})

blogRouter.put("/",async(c) => {
    const body = await c.req.json();
    // const authorid = await body.req.id;

    const Prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const blog = await Prisma.blog.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content
        }
    })

    return c.json({
        id : blog.id
    })
});

blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const blogs = await prisma.blog.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    })

    return c.json({
        blogs
    })
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param('id');
    // const body = c.req.json()
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                id:true, 
                content: true,
                title: true,
                author: {
                    select: {
                        name: true
                    }
            }
        }
        });
        if (blog) {
            return c.json({ blog });
        } else {
            c.status(404);
            return c.json({
                message: "no such id registered/error while fetching"
            });
        }
    } catch (e) {
        c.status(500);
        return c.json({
            message: "error while fetching"
        });
    }
});


