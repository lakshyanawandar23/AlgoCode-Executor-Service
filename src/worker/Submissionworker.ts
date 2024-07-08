import redisConnection from "../config/redis.config";
import runcpp from "../containers/runcppcontainer";
import SubmissionJob from "../jobs/SubmissionJob";
import { Job, Worker } from "bullmq";


export default function SubmissionWorker(queuename:string){
   new Worker(
    queuename,
    async (job:Job)=>{
        console.log(job.name)
        if(job.name==="submissionQueue"){
             console.log(job.data);
             const sampel=new SubmissionJob(job.data);
             console.log(sampel.payload.inputestcase);
             if(sampel.payload.language==="cpp"){
                runcpp(sampel.payload.code,sampel.payload.inputestcase);
            }
             return true;
        }
    },
        {
            connection:redisConnection
        }
)
}