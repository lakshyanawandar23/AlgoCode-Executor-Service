import { Job } from "bullmq";
import { IJob } from "../interface/bullMqJobdefintion";


export default class SampleJob implements IJob{
    name :string;
    payload: Record<string, unknown>;
    constructor(payload:Record<string,unknown>){
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