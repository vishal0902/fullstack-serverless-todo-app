
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";


const authRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    };
  }>();

  authRouter.use(async(c,next)=>{
    const token = c.req.header("authorization") || "";
    const user = await verify(token, c.env.JWT_SECRET)
    if(user){
        c.set("jwtPayload", user.id)
        await next()
    } else{
        c.status(403)
        return c.json({
            message: "Not authorized"
        })
    }
})
export default authRouter