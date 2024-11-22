import express from "express";
import multer from "multer";
import { obterPosts, cadastrarPost, uploadPost } from "../controller/postController.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({dest:"./uploads", storage})

const routes = (app) => {
    app.use(express.json());
    
    app.get("/posts", obterPosts);
    app.post("/posts", cadastrarPost)
    app.post("/posts/upload", upload.single("imagem"), uploadPost)
}

export default routes;