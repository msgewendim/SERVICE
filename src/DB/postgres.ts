import { Pool } from "pg";
import "dotenv/config"

const pool = new Pool({
    // gets info from the .env file
    user : process.env.user,
    host: process.env.host  || "localhost",
    database : process.env.database,
    password : process.env.password,
    port: parseInt(process.env.port || "5432", 10), 
})


export default pool