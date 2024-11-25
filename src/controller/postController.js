import fs from "fs";
import { obterTodosPosts, criarPost, colocarPost } from "../model/postModel.js";
import gerarDescricaoComGemini from "../service/geminiService.js";

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
        const postCriado = await criarPost(novoPost)        
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error("Erro ao cadastrar post.", erro.message);
        res.status(500).json({"Erro": "Falha na requisição"})
    }
}

export async function atualizarPost(req, res) {
    const id = req.params.id;
    const urlImg = `http://localhost:3000/${id}.png`;
    
    try {
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricaoGemini = await gerarDescricaoComGemini(imageBuffer)
        
        const post = {
            imgUrl: urlImg,
            descricao: descricaoGemini,
            alt: req.body.alt
        }

        const postCriado = await colocarPost(id, post)
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error("Erro ao cadastrar post.", erro.message);
        res.status(500).json({"Erro": "Falha na requisição"})
    }
}