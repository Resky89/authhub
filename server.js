import express from "express"
import dotenv from "dotenv"
import http from "http"
import ngrok from "@ngrok/ngrok"

dotenv.config()
const app = express()
// app.use(express.json())
const port = process.env.PORT
const server = http.createServer(app)

app.get("/",(req,res)=>{
    res.json({message:"Welcome to express"})
})

async function startNgrok(){
    try {
        const listener = await ngrok.connect({
            addr:port,
            authtoken_from_env:true,
        })
        console.log(`your ngrok established at ${listener.url()}`)
    } catch (error) {
        console.error("failed to connectngrok",error)
    }
}

server.listen(port,()=>{
    console.log(`your server running at port${port}`)
    startNgrok()
})