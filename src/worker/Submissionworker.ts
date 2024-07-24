import redisConnection from "../config/redis.config";
import runcpp from "../containers/runcppcontainer";
import createexcutor from "../interface/createexecutor";
import SubmissionJob from "../jobs/SubmissionJob";
import { Job, Worker } from "bullmq";


export default function SubmissionWorker(queuename:string){
   new Worker(
    queuename,
    async (job:Job)=>{
       // console.log(job)
        if(job.name==="submissionQueue"){
           // console.log(job.data);
             const sampel=new SubmissionJob(job.data);
       const resp=    await   sampel.handle(job);
          //   console.log(sampel.payload.inputestcase);
          console.log(resp);
             return true;
        }
    },
        {
            connection:redisConnection
        }
)
}