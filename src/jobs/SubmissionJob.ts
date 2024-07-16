import { Job } from "bullmq";
import { IJob } from "../interface/bullMqJobdefintion";
import runcpp from "../containers/runcppcontainer";
import { submissiontype } from "../interface/submissiontype";
import createexcutor from "../interface/createexecutor";


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
          else{
            const language=this.payload.language;
            const stretegy=createexcutor(language);
           const response= stretegy.execute(this.payload.code,this.payload.inputestcase,this.payload.outputestcase);
           return response;
          }
    }
    failed= (job?:Job)=>{
       console.log("error in job")
    }
}