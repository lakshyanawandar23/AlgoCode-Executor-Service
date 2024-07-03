import Dockerode from "dockerode";

import containerFactory from "./containerFactory";
import { PYTHON_IMAGE } from "../utils/images";
import dockerstreme from "./dockerhelper";
import { testcase } from "../interface/testcasestype";

async function runPython(code:string,inputTestCase:string){
    const buffer :Buffer []=[];
    console.log("Intalize the container");
    console.log(code);
    const runcommand=`echo '${code.replace(/'/g, `'\\"`)}' > test.py && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | python3 test.py`;
    const container =await containerFactory(PYTHON_IMAGE,['/bin/sh','-c',runcommand]);
      console.log("Booting container")
   await container.start();
     const logger=await container.logs({
        stdout:true,
        stderr:true,
        timestamps:false,
        follow:true,
     })
     logger.on('data',(chunk)=>{ 
      //console.log(chunk)
       buffer.push(chunk);
     })
     logger.on('end',()=>{
        //console.log(buffer);
        const completebuffer =Buffer.concat(buffer);
        const decodebuffer=dockerstreme(completebuffer);
        console.log(decodebuffer);
     })
     return container;
}

export default runPython;