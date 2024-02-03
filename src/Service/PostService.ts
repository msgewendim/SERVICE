import PostDalSql from "../Dal/PostDalSQL";
import Post from "../models/Post";

export class postService {

    private postDataAccess : PostDalSql;

    constructor(postDataAccess : PostDalSql){
        this.postDataAccess = postDataAccess
    }

    async getPost(postId : number) : Promise<Post>{
        const result = await this.postDataAccess.getPost(postId);
        if (!result){
            throw new Error(`Post with id : ${postId} Not found`);
        }
        return result;
    }

    async addPost(post : Post) : Promise<void>{
        try {
            await this.postDataAccess.addPost(post);
        }catch{
            throw new Error("Can not add post!")
        }
    }

    async getAllPosts(page : number, pageSize : number , filter? : string ) : Promise<Post[]>{
        try{
            const result = await this.postDataAccess.getAllPosts(page , pageSize, filter);
            return result;
        }catch(error) {
            throw new Error("NO Posts Found!");
        }
    }

    async updatePost(postId: number, postData: Post):Promise<void>{
        try{
            await this.postDataAccess.updatePost(postId, postData);
        }catch(error){
            throw new Error(`Can not update post! ${(error as Error).message}`)
        }
    }

    async deletePost(postId : number) : Promise<void>{
        try {
            await this.postDataAccess.deletePost(postId);
        } catch (error) {
            throw new Error(`Can't delete post ${(error as Error).message}`)
        }
    }
}