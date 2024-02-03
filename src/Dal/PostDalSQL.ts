import {DataAccess} from './InterfacePostDal';
import Post from '../models/Post';
import pool from '../../src/DB/postgres';

export class PostDalSql implements DataAccess<Post> {

    async getPost(postId: number): Promise<Post> {
        const query = "SELECT * FROM posts WHERE id = $1"; 
        const result = await pool.query(query ,[postId]);

        if (result.rows.length === 0){
            throw new Error("Post not found!")
        }
        return result.rows[0]
    }

    async getAllPosts(page = 1, pageSize = 5, filter?:string): Promise<Post[]> {
        let query = "SELECT * FROM posts";
        const params : (string |number )[] = [];
        const offset = (page - 1) * pageSize;
        params.push(offset, pageSize)

        if (filter){
            query += " WHERE title ILIKE $3 OR content ILIKE $3";
            params.push(`%${filter}%`)
        }

        query += " OFFSET $1 LIMIT $2";
        const result = await pool.query(query, params)

        if (result.rows.length === 0){
            throw new Error("POSTS NOT FOUND!")
        }
        console.log(`found posts`, result.rowCount)
        return result.rows;
    }

    async deletePost(postId: number): Promise<void> {
        const query = "DELETE FROM posts WHERE id = $1";
        const result = await pool.query(query, [postId]);

        if (result.rowCount === 0){
            throw new Error("POST NOT FOUND! / NOT DELETED")
        }

    }

    async updatePost(postId: number, postData: Partial<Post>): Promise<void> {
        
        const keys = Object.keys(postData)
        const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");

        const query = `UPDATE posts SET ${setClause} WHERE id = $${keys.length + 1}`;
        const values = [...Object.values(postData), postId]

        const result = await pool.query(query, values);

        if(result.rowCount === 0){
            throw new Error(`Post with ID ${postId} not found`);
        }
    }

    async addPost(post: Post): Promise<void> {
        const query = "INSERT INTO posts (title, content) VALUES ($1, $2)"
        await pool.query(query, [post.title, post.content])
        console.log(`POST ADDED SUCCESSFULLY!`)

    }
}  

export default PostDalSql;