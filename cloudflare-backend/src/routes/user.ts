import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import z from "zod";
// import authRouter from "../middleware/auth";

// Create the main Hono app
const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

const signupInput = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(6),
});

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({
      message: "failure",
      error: "Incorrect Input.",
    });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        password: body.password,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token: token });
  } catch (e) {
    c.status(403);
    return c.json({ error: "error while signing up" });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
  });
  if (!user) {
    c.status(403);
    return c.json({ error: "error while signing in" });
  }
  const token = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({
    token: token,
  });
});


userRouter.use('/getUserData' , async (c, next) => {
  const token = c.req.header("authorization") || "";
  console.log("Helllo")
  const jwt = token.split(" ")[1]
  const user = await verify(jwt, c.env.JWT_SECRET);
  if (user) {
    c.set("userId", user.id);
    await next();
  } else {
    c.status(403);
    return c.json({
      message: "Not authorized",
    });
  }
});

userRouter.get('/getUserData', async (c)=>{
  
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
  const userData = await prisma.user.findUnique({
    where: {
     id: Number(c.get("userId"))
    },
    select: {
     firstName:true,
     lastName: true,
     todos: true
    }
  })
  
  return c.json({
    message: "success",
    userData: userData

  })
  
  
})





export default userRouter;
