import { Request,Response } from "express";
import { CreateSubmissiondto } from "../dtos/createSubmissiondto";
export const  submissionController=(req:Request,res:Response)=>{
    const submissiondto=req.body as  CreateSubmissiondto;

    //validate using zod 
      return res.status(201).json({
        success:"true",
        message:"submission submitted",
        error:"",
        data:submissiondto,
      })
}