import { Queue } from "bullmq";
import redisConnection from "../config/redis.config";
const Samplequeue=new Queue('Sample',{
    connection:redisConnection
});

export default Samplequeue;