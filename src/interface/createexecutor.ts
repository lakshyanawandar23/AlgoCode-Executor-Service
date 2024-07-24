import { CodeExecutorStrategy } from "./CodeExecutorStrategy";
import PythonExecutor from "../containers/runpythoncontainer";
import CppExecutor from "../containers/runcppcontainer";
import JavaExecutor from "../containers/runjavacontainer";

export default function createexcutor(language:string):CodeExecutorStrategy{
    if(language==="cpp"){
      return   new CppExecutor();
    }
    else if(language==="python"){
        return new PythonExecutor();
    }
    else {
      return new JavaExecutor();
    }
}