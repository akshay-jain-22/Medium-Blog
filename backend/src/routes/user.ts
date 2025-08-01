import { Hono } from 'hono'
import { PrismaClient } from '../generated/prisma/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signupInput, signinInput } from "@akshuuu22/common12"

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>()

userRouter.post('/signup', async (c) => {
  const body = await c.req.json();
  const result = signupInput.safeParse(body);
  if (!result.success) {
    c.status(411);
    return c.json({
      message: "inputs not correct"
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name
      }
    });

    const jwtToken = await sign({
      id: user.id
    }, c.env.JWT_SECRET);
    return c.text(jwtToken);
  } catch (e) {
    c.status(404);
    return c.text('Invalid');
  }
});

userRouter.post('/signin', async (c) => {
  const body = await c.req.json();
  const result = signinInput.safeParse(body);
  if (!result.success) {
    c.status(411);
    return c.json({
      message: "inputs not correct"
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
        password: body.password,
      }
    });

    if (!user) {
      c.status(403);
      return c.json({
        message: "incorrect cred"
      });
    }

    const jwtToken = await sign({
      id: user.id
    }, c.env.JWT_SECRET);

    return c.text(jwtToken);
  } catch (e) {
    c.status(404);
    return c.text('Invalid');
  }
});