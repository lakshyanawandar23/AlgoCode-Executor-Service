import { Redis } from "ioredis";
export const config={
    PORT:process.env.REDIS_PORT,
    host:process.env.REDIS_IP,
    maxRetriesPerRequest:null
}
const redisConnection=new Redis(config);

export default redisConnection;