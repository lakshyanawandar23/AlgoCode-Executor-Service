import { DOCKER_STREME_HEADER_SIZE } from "../utils/images";
import { dockerstreamtype } from "../interface/dockerstreamtype";


export default function  dockerstreme(buffer :Buffer  ):dockerstreamtype {
  let offset=0;
const output:dockerstreamtype={
   stdout:'',stderr:''
}
console.log(buffer.length)

while(offset<buffer.length){
    const typeOfStream=buffer[offset];
    const length = buffer.readUint32BE(offset + 4);

    // as now we have read the header, we can move forward to the value of the chunk
    offset += DOCKER_STREME_HEADER_SIZE;
    if(typeOfStream === 1) {
        // stdout stream
      //  console.log("hi")
        output.stdout += buffer.toString('utf-8', offset, offset + length);
    } else if(typeOfStream === 2) {
        // stderr stream
        output.stderr += buffer.toString('utf-8', offset, offset + length);
    }
    offset+=length;
}
return output;
}