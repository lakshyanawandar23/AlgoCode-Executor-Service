// import Docker from 'dockerode';

// import { TestCases } from '../types/testCases';

import {CodeExecutorStrategy, ExecutionResponse } from '../interface/CodeExecutorStrategy';
import { JAVA_IMAGE } from '../utils/images';
import containerFactory from "./containerFactory";
import dockerstreme from "./dockerhelper";

class JavaExecutor implements CodeExecutorStrategy {
    async execute(code: string, inputTestCase: string, outputCase: string): Promise<ExecutionResponse> {
        console.log("Java executor called");
        console.log(code, inputTestCase, outputCase);

        const buffer: Buffer[] = [];

      //  await pullImage(JAVA_IMAGE);

        console.log("Initialising a new java docker container");
    //    console.log(`Code received is \n ${code.replace(/'/g, `'\\"`)}`)
        const runcommand = `echo '${code.replace(/'/g, `'\\"`)}' > Main.java && javac Main.java && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | java Main`;
      //  console.log(runCommand);
        const container = await containerFactory(JAVA_IMAGE, ['bin/sh','-c',runcommand]); 

  console.log("booting container")
        // starting / booting the corresponding docker container
        await container.start();

        console.log("Started the docker container");

        const logger = await container.logs({
            stdout: true,
            stderr: true,
            timestamps: false,
            follow: true // whether the logs are streamed or returned as a string
        });
        
        // Attach events on the stream objects to start and stop reading
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

export default JavaExecutor;