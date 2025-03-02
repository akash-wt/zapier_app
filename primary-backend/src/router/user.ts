import { Router } from "express";
import { authMiddleware } from "../middleware";
import { SighupSchema, SigninSchema } from "../types";
import { client } from "../db";
import jwt from "jsonwebtoken"
import { JWT_PASSWORD } from "../config";

const router = Router();
// @ts-ignore 
router.post("/signup", async (req, res) => {
    try {
        const body = req.body;
        const parseBody = SighupSchema.safeParse(body);

        if (!parseBody.success) {
            console.log(parseBody.error);

            return res.status(411).json({ msg: "incorect inputs" })
        }

        const userExist = await client.user.findFirst({
            where: {
                email: parseBody.data.email
            }
        })

        if (userExist) {
            return res.status(403).json({
                msg: "user already exist"
            })
        }

        const newUser = await client.user.create({
            data: {
                email: parseBody.data.email,
                password: parseBody.data.password,
                name: parseBody.data.password
            }
        })

        return res.status(201).json({
            msg: "User created successfully",
            user: newUser
        })
    } catch (e) {
        console.error("Signup error:", e);
        return res.status(500).json({ msg: "Internal Server Error" });
    }

})
//@ts-ignore
router.post("/signin", async (req, res) => {
    const body = req.body;
    const parsedData = SigninSchema.safeParse(body);

    if (!parsedData.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await client.user.findFirst({
        where: {
            email: parsedData.data.email,
            password: parsedData.data.password
        }
    });

    if (!user) {
        return res.status(403).json({
            msg: "User credential are incorrect"
        })
    }

    const token = jwt.sign({
        id: user.id
    }, JWT_PASSWORD)

    res.json({
        token: token,
    });

})

// @ts-ignore 
router.get("/", authMiddleware, async (req, res) => {
    // @ts-ignore 
    const id = req.id;
    const user = await client.user.findFirst({
        where: {
            id
        },
        select: {
            name: true,
            email: true
        }
    })

    return res.json({
        user
    })
})

export const userRouter = router;