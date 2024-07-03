import { z } from "zod"
// dtos are used to transfer data b/w client and server it used for data validation and security
export interface  CreateSubmissiondto {
    userid:string,
    probelmid:string,
    code:string,
    language:string
}
//export const CreateSubmissiondto=<typeof submissionSchema> 
//zod schema
export const submissionSchema=z.object({
    userid:z.string(),
    probelmid:z.string(),
    code:z.string(),
    language:z.string(),
})