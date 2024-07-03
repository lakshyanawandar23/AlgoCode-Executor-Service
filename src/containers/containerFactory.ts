import Dockerode from "dockerode";

async function containerFactory(imagename:string,cmdexecute:string []){
    const docker=new Dockerode();
    const container= await docker.createContainer({
       Image:imagename,
        AttachStdin:true,     //input stream
        AttachStdout:true,    //output stream
        AttachStderr:true,    //error stream
        Cmd:cmdexecute,
        Tty:false,
        OpenStdin:true,
    })
    return container;
}

export default containerFactory;