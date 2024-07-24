import { Job } from "bullmq";
import { IJob } from "../interface/bullMqJobdefintion";
import runcpp from "../containers/runcppcontainer";
import { submissiontype } from "../interface/submissiontype";
import createexcutor from "../interface/createexecutor";
import { codecreator } from "../utils/codecreator";
import { ExecutionResponse } from "../interface/CodeExecutorStrategy";


export default class SubmissionJob implements IJob{
    name :string;
    payload:  Record<string, submissiontype>;
    constructor(payload: Record<string, submissiontype>){
        this.name=this.constructor.name;
        this.payload=payload;
    }
    handle= async(job?: Job) => {
          if(!job){
            console.log("job not found")
          }
          else{
            console.log("hi");
            const key = Object.keys(this.payload)[0];
            const language=this.payload[key].language;
            console.log(language);
            const stretegy=createexcutor(language);
         //   const code=codecreator(startsnippet,usersnippet,endsnippet);
         console.log(this.payload)
         console.log(this.payload[key].inputestcase);
           const response:ExecutionResponse= await stretegy.execute(this.payload[key].code,this.payload[key].inputestcase,this.payload[key].outputestcase);
           console.log(response);
           if(response.status=="COMPLETED"){
                  console.log("code executed successfully");
                  return response;  
           }
          else {
            console.log("error in code");
           return response;
          }
          }
    }
    failed= (job?:Job)=>{
       console.log("error in job")
    }
}