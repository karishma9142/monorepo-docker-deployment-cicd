import express from "express";
import { prisma } from 'db/client'

const app = express();
app.use(express.json());
console.log(process.env.DATABASE_URL);
app.post("/users", async (req, res) => {
    try {
        const  username= req.body.username;
        const password = req.body.password;
        if (!username || !password) {
            res.status(400).json({
                error: "username and password required"
            })
        }
        const user = await prisma.user.create({
            data: {
                username,
                password
            }
        })

        res.status(200).json({
            msg: "user created"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "internal server error"
        })
    }
})

app.get("/users", async (req, res) => {
    try {
        const data = await prisma.user.findMany();
        res.status(200).json({
            data : data
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "internal server error"
        })
    }
})

app.listen(8080 , ()=> {
    console.log("server running on port 3000")
})