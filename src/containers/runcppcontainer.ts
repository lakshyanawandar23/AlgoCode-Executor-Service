import containerFactory from "./containerFactory";
import { CPP_IMAGE } from "../utils/images";
import dockerstreme from "./dockerhelper";
import { CodeExecutorStrategy } from "../interface/CodeExecutorStrategy";


class  CppExecutor implements CodeExecutorStrategy{

async  execute(code:string,inputTestCase:string){
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
     try {
      const codeResponse : string = await this.fetchDecodedStream(logger, buffer);
      return {output: codeResponse, status: "COMPLETED"};
  } catch (error) {
      return {output: error as string, status: "ERROR"}
  } finally {
      await container.remove();

  }
}

fetchDecodedStream(loggerStream: NodeJS.ReadableStream, rawLogBuffer: Buffer[]) : Promise<string> {
  return new Promise((res, rej) => {
      loggerStream.on('end', () => {
          console.log(rawLogBuffer);
          const completeBuffer = Buffer.concat(rawLogBuffer);
          const decodedStream = dockerstreme(completeBuffer);
          console.log(decodedStream);
          console.log(decodedStream.stdout);
          if(decodedStream.stderr) {
              rej(decodedStream.stderr);
          } else {
              res(decodedStream.stdout);
          }
      });
  })
}
}

export default CppExecutor;