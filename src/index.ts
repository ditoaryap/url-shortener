import express, {Response, Request} from "express";
import dotenv from "dotenv";

import urlRouter from "./routes/url.router"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json());

app.use(urlRouter)

app.use("/", (req: Request, res: Response) => {
    res.send("TEST API")
})

app.listen(PORT, () => {
    console.log(`Express running on PORT : ${PORT}`)
})
