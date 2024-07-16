import { CodeExecutorStrategy } from "./CodeExecutorStrategy";
import PythonExecutor from "../containers/runpythoncontainer";
import CppExecutor from "../containers/runcppcontainer";

export default function createexcutor(language:string):CodeExecutorStrategy{
    if(language==="cpp"){
      return   new CppExecutor();
    }
    else {
        return new PythonExecutor();
    }
}