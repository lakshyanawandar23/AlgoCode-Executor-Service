import { submissiontype } from "../interface/submissiontype";
import Submissionqueue from "../queue/submissionqueue";


const CreateSubmissionJob=async(name:string,payload:submissiontype)=>{
     await  Submissionqueue.add(name,payload);
     console.log("added a job successfully")
}

export default CreateSubmissionJob;