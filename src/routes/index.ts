import express from 'express';
import v1Router from './v1';
const Router=express.Router();
console.log("v1router")
Router.use('/v1',v1Router);

export default Router;