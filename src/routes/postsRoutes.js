import express from "express";
import { obterPosts } from "../controller/postController.js";

const routes = (app) => {
    app.use(express.json());
    
    app.get("/posts", obterPosts);
}

export default routes;