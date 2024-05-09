import  express ,{Request,Response} from "express";
import  serverconfig from './config/server.config'
import apiRouter from "./routes";
import CreateJob from "./producers/Sampleproducer";
import SampleWorker from "./worker/Sampleworker";
import bullboardAdapter from './config/bullboard.config'
const app=express();

app.get('/',(req:Request,res:Response)=>{
    res.send("hello welcome");
})

app.use('/api',apiRouter);
app.use('/ui',bullboardAdapter.getRouter());

app.listen(serverconfig.PORT,()=>{
    console.log("server is up");
    console.log("ui dashboard ")
   SampleWorker("Sample");
    CreateJob("Sample",{
       name:"Lakshya",
       role:"sde-2"
   })
})