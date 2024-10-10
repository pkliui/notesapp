import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
// add Prisma DB client
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

// to find api endpoint express
app.get("/api/notes", async (req, res) => {

    // use Prrisma to call some data from the data base
    const notes = await prisma.note.findMany()

    // update with the notes!!
    res.json({notes})
})

app.listen(5000, () =>{
        console.log("server running on localhost:5000")
});