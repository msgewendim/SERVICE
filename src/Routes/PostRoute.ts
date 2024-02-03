import { postService } from "../Service/PostService";
import express, {Request, Response, Router } from "express";
import PostDalSql from "../Dal/PostDalSQL";
import {PostController} from "../controllers/PostController";

const router = express.Router();
const postController = new PostController(new postService(new PostDalSql));

router.get("/", async (req:Request, res : Response) => await postController.getAllPosts(req, res));
router.get("/:id", async (req:Request, res : Response) => await postController.getPost(req, res));
router.post("/", async (req:Request, res : Response) => await postController.addPost(req, res));
router.delete("/:id", async (req:Request, res : Response) => await postController.deletePost(req, res));
router.put("/:id", async (req:Request, res : Response) => await postController.updatePost(req, res));

export default router;