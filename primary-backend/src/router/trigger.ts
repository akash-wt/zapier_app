import { Router } from "express";
import { client } from "../db";

const router = Router();

router.get("/available", async (req, res) => {
    const availableTriggers = await client.availableTriggers.findMany({});
    console.log("availableTriggers : "+availableTriggers);
    
    res.json({
        availableTriggers
    })
})



export const triggerRouter = router;
