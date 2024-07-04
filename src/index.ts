import  express ,{Request,Response} from "express";
import  serverconfig from './config/server.config'
import apiRouter from "./routes";
import bodyParser from "body-parser";
import CreateJob from "./producers/Sampleproducer";
import SampleWorker from "./worker/Sampleworker";
import bullboardAdapter from './config/bullboard.config'
import runPython from "./containers/runpythoncontainer";
import runcpp from "./containers/runcppcontainer";
const app=express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());
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
const code =`#include <bits/stdc++.h>
    using namespace std;
   int main(){
    int x;
    cin>>x;
    cout<<x<<endl;
   }
`;
   runcpp(code,"50");
})

//types in typescript
// type person={
//     id:number,
//     name:string,
// }
//unions
//let x:number|string;