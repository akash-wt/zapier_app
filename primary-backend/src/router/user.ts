import { Router } from "express";
import { authMiddleware } from "../middleware";

const router = Router();

router.post("/signup", async (req, res) => {

})

router.post("/signin", async (req, res) => {

})

router.get("/user", authMiddleware, (req, res) => {

})

export const userRouter = router;