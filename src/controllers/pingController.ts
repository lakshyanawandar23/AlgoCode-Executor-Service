import {Request,Response} from "express";

 export const pingController=(_:Request,res:Response)=> {
      console.log("ping check");
      return res.status(200).json({
        message: "Ping check ok"
    });
}