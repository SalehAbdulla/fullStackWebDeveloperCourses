import express from "express"
import bodyParser from "body-parser"


import { dirname } from "path";
import { fileURLToPath } from "url";


const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.get('/check', (req, res)=>{
    res.sendFile( __dirname + "/public/index.html")
})


app.use(bodyParser.urlencoded({extended:true}))


app.post('/check', (req, res)=>{
    // console.log(req.body)
    // { password: 'Hello' }
    if (req.body['password'] === "ILoveProgramming"){
        res.sendFile(__dirname + "/public/secret.html")
    } else {
        res.sendFile(__dirname + "/public/index.html")
    }
})



app.listen(port, ()=>{
    console.log(`Server is running on Port ${port}`)
})