// holds server and API code

import express from "express"; // main web framework
import cors from "cors"; // middleware that allows our server to accept requests from different domains 
import { PrismaClient } from "@prisma/client"; // the interface to our database 

// create a new express app
const app = express();
// add Prisma DB client
const prisma = new PrismaClient();

app.use(express.json()); // lets your app automatically parse JSON data in requests
app.use(cors()); // to be able to access by web apps from different servers

// create get endpoint
app.get("/api/notes", async (req, res) => {

     // use Prisma to get all data from the data base
     // .note references the model we created in schema.prisma
     const notes = await prisma.note.findMany();

     // update with the notes!!
     res.json(notes);
})

// create post endpoint
app.post("/api/notes", async (req, res) => {

    const {title, content} = req.body;


    //if (!title || !content) {
    //    return res.status(400).send("title and content fields required");
    //  }

    try{
        const note = await prisma.note.create({
            data: {title, content},
        });
        // response with a json note
        res.json(note);
     } catch(error){
        res.status(500).send("Oops something went wrong");
     }
});

     
// add put endpoint to update notes
app.put("/api/notes/:id", async(req, res)=>{

    // specify body and ID
    const {title, content} = req.body;
    const id = parseInt(req.params.id);

    //if(!id || isNaN(id)){
    //    return res
    //        .status(400)
    //        .send("ID must be valid number");
    //}
    try{
        const updatedNote = await prisma.note.update({
            where: {id},
            data: {title, content}
        });
        res.json(updatedNote);
    }catch (error){
        res
          .status(500)
          .send("opps, something went wrongs again");
    }

})

// delete notes
app.delete("/api/notes/:id", async (req, res) =>{
        const id = parseInt(req.params.id);

        // validation missing
        try{
            await prisma.note.delete({
                    where:{id},
            });
            res.status(204).send();
        } catch(error){
            res
                .status(500)
                .send("oops, something went wrongs");
        }
})

app.listen(5000, () =>{
        console.log("server running on localhost:5000")
});