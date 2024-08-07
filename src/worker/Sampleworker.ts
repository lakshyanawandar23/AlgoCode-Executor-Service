import redisConnection from "../config/redis.config";
import SampleJob from "../jobs/SampleJobs";
import { Job, Worker } from "bullmq";


export default function SampleWorker(queuename:string){
   new Worker(
    queuename,
    async (job:Job)=>{
        console.log(job.name)
        if(job.name==="Sample"){
             console.log(job.data);
             const sampel=new SampleJob(job.data);
             console.log(sampel);
             return true;
        }
    },
        {
            connection:redisConnection
        }
)
}