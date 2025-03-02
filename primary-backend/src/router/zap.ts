import { Router } from "express";
import { authMiddleware } from "../middleware";

const router = Router();

router.post("/",authMiddleware, async (req, res) => {

})

router.get("/", authMiddleware,async (req, res) => {

})

router.get("/:zapId", authMiddleware, (req, res) => {

})

export const zapRouter = router;