import { postService } from "../Service/PostService";
import { Response, Request } from "express";

export class PostController {

    private postService : postService;

    constructor(postService:postService){
        this.postService = postService
    }

    async getPost( req:Request, res:Response){
        const postId = +req.params.id;
        try {
            const post = await this.postService.getPost(postId)
            res.status(200).json(post);
        } catch (error) {
            res.status(400).json((error as Error).message);
        }
    }

    async getAllPosts(req: Request, res:Response){
        try {
            // receive this from the URL if specify
            const {page = 1, pageSize = 5, filter} = req.query;
            // all data in the query is as string so needed to ParseIt
            const parsedPage = parseInt(page as string, 10);
            // function takes string , counting BASE &  returns Integer
            const parsedPageSize = parseInt(pageSize as string, 10);
            const posts = await this.postService.getAllPosts(parsedPage, parsedPageSize, filter as string);
            res.status(200).json(posts);
        } catch (error) {
            res.status(400).json((error as Error).message);
        }
    }

    async addPost(req : Request, res: Response){
        const post = req.body;

        try {
            await this.postService.addPost(post);
            res.status(201).send("POST Added to DB!");
        } catch (error) {
            res.status(400).json((error as Error).message);
        }
    }

    async deletePost(req:Request, res : Response){
        const postId = +req.params.id;

        try {
            await this.postService.deletePost(postId);
            res.status(200).send("POST Deleted from DB!");
        } catch (error) {
            res.status(400).json((error as Error).message);
        }
    }

    async updatePost(req : Request, res : Response){
        const postId = +req.params.id;
        const postData = req.body;

        try {
            await this.postService.updatePost(postId, postData);
            res.status(201).send("POST Updated!");
        } catch (error) {
            res.status(400).json((error as Error).message);

        }

    }
}