import { Job } from "bullmq";
import { IJob } from "../interface/bullMqJobdefintion";
import runcpp from "../containers/runcppcontainer";
import { submissiontype } from "../interface/submissiontype";


export default class SubmissionJob implements IJob{
    name :string;
    payload: submissiontype;
    constructor(payload:submissiontype){
        this.name=this.constructor.name;
        this.payload=payload;
    }
    handle= (job?: Job) => {
          if(!job){
            console.log("job not found")
          }
    }
    failed= (job?:Job)=>{
       console.log("error in job")
    }
}