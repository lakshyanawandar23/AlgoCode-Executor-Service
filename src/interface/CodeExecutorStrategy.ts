//created a interface to overide  function in each language.
export interface CodeExecutorStrategy {
         execute(code:string,inputestcase:string,outputestcase:string):Promise<ExecutionResponse>;
}

export type ExecutionResponse={
    output:string,
    status:string,
};