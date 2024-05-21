import express from 'express'
import {pingController} from '../../controllers/pingController';
import { submissionController } from '../../controllers/submissionController';
import { validationSubmissiondto } from '../../validator/createSubmissionValidator';
import { submissionSchema } from '../../dtos/createSubmissiondto';
const v1Router=express.Router();
console.log("ping")
v1Router.get('/ping',pingController);
v1Router.post('/submission',validationSubmissiondto(submissionSchema),submissionController);
export default v1Router;