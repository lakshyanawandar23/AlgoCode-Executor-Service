import  express ,{Request,Response} from "express";
import  serverconfig from './config/server.config'
import apiRouter from "./routes";
const app=express();

app.get('/',(req:Request,res:Response)=>{
    res.send("hello welcome");
})

app.use('/api',apiRouter);


app.listen(serverconfig.PORT,()=>{
    console.log("server is up");
})