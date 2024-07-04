import containerFactory from "./containerFactory";
import { CPP_IMAGE } from "../utils/images";
import dockerstreme from "./dockerhelper";

async function runcpp(code:string,inputTestCase:string){
    const buffer :Buffer []=[];
    console.log("Intalize the container");
    console.log(code);
    const runcommand =   `echo '${code.replace(/'/g, `'\\"`)}' > main.cpp && g++ main.cpp -o main && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | ./main`;
    const container =await containerFactory(CPP_IMAGE,['bin/sh','-c',runcommand]);
      console.log("Booting container")
   await container.start();
     const logger=await container.logs({
        stdout:true,
        stderr:true,
        timestamps:false,
        follow:true,
     })
   //  console.log(logger)
     logger.on('data',(chunk)=>{ 
      //console.log(chunk)
       buffer.push(chunk);
     })
     let decodebuffer;
     logger.on('end',()=>{
        //console.log(buffer);
        const completebuffer =Buffer.concat(buffer);
         decodebuffer=dockerstreme(completebuffer);
        console.log(decodebuffer);
        container.remove();
     })
     return decodebuffer;
}

export default runcpp;