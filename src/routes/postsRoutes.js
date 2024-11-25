import express from "express";
import multer from "multer";
import { obterPosts, cadastrarPost, uploadPost, atualizarPost } from "../controller/postController.js";
import cors from "cors"

const corsOption = {
    origin: "http://localhost:8000",
    optionSuccessStatus: 200
}

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

    app.use(cors(corsOption));

    app.get("/posts", obterPosts);
    
    app.post("/posts", cadastrarPost)
    
    app.post("/posts/upload", upload.single("imagem"), uploadPost)

    app.put("/posts/upload/:id", atualizarPost)
}

export default routes;