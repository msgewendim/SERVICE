import express  from "express";
import PostRoute from "./src/Routes/PostRoute";

const server = express();

const port = 3005;
server.use(express.json())

server.use("/posts", PostRoute);

server.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
});
