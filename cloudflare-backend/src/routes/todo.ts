import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";

// Create the main Hono app
const todoRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: string;
  };
}>();



//authorization middleware
todoRouter.use('/*' , async (c, next) => {
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







todoRouter.post("/add", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  console.log("The user id is "+c.get("userId"))
  const todo = await prisma.todo.create({
    data: {
      title: body.title,
      description: body.description,
      userId: parseInt(c.get("userId"))
    },
  });

  return c.json({
    message: "success",
    todo: todo,
  });
});



todoRouter.put("/toggleDone", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json()
  
  const todo = await prisma.todo.update({
    where:{
        id: body.id
    },
    data:{
        done: body.done
    },
    select:{
        id: true,
        title: true,
        description: true,
        done: true
    }
  });

  return c.json({
    message: "success",
    todo: todo,
  });
});

todoRouter.delete("/delete", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json()


  const todo = await prisma.todo.delete({
    where: {
      id: Number(body.id),
    },
  });

  return c.json({
    message: "success",
    todo: todo,
  });
});

todoRouter.get("/getTodos", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const todos = await prisma.todo.findMany({
    where: {
      userId: Number(c.get("userId")),
    },
    select:{
        id: true,
        title: true,
        description: true,
        done: true
    }
  });

  return c.json({
    message: "success",
    todos: todos,
  });
});

export default todoRouter;
