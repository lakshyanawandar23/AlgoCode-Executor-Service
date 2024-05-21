import { NextFunction,Request,Response } from "express";
import { Schema, z } from "zod";
import {submissionSchema } from "../dtos/createSubmissiondto";
import { tryCatch } from "bullmq";

export const validationSubmissiondto=(sechma:typeof submissionSchema)=>(req:Request,res:Response,next:NextFunction)=>{
       try{
   sechma.parse({...req.body});
   next();
       }
       catch(e){
       // console.log(e);
        return res.status(404).json({
            error:"Bad Request"
        })
       }
}

