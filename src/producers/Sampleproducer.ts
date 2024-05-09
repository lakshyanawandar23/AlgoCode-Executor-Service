import Samplequeue from "../queue/Samplequeue";


const CreateJob=async(name:string,payload:Record<string,unknown>)=>{
     await  Samplequeue.add(name,payload);
     console.log("added a job")
}

export default CreateJob;