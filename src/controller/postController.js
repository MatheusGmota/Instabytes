import fs from "fs";
import { obterTodosPosts, criarPost } from "../model/postModel.js";

export async function obterPosts(req, res) {
    const posts = await obterTodosPosts()
    res.status(200).json(posts);
}

export async function cadastrarPost(req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost)
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error("Erro ao cadastrar post.", erro.message);
        res.status(500).json({"Erro": "Falha na requisição"})
    }
}

export async function uploadPost(req, res) { 
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };
    try {
        const postCriado = await uploadImagem(novoPost)        
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error("Erro ao cadastrar post.", erro.message);
        res.status(500).json({"Erro": "Falha na requisição"})
    }
}