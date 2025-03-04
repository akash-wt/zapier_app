import { Router } from "express";
import { client } from "../db";


const router = Router();


router.get("/available", async (req, res) => {
    const availableActions = await client.availableAction.findMany({});

    console.log("availableActions :" + availableActions);

    res.json({
        availableActions
    })
})




export const actionRouter = router;
