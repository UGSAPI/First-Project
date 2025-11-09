
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const API_KEY = "YOUR-API-KEY";
const PORT = 3000;

app.get("/visits/:userId", async (req, res) => {
    const userId = req.params.userId;

    let totalVisits = 0;

    const userExperiences = await fetch(
        `https://apis.roblox.com/universes/v1/users/${userId}/universes`,
        {
            headers: {
                "x-api-key": API_KEY
            }
        }
    )
    .then(r => r.json());

    for (const place of userExperiences.data) {
        totalVisits += place.visits;
    }

    res.json({ visits: totalVisits });
});

app.listen(PORT, () => console.log(`Running on ${PORT}`));
