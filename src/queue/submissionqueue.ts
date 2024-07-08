import { Queue } from "bullmq";
import redisConnection from "../config/redis.config";
const Submissionqueue=new Queue('submissionQueue',{
    connection:redisConnection
});

export default Submissionqueue;