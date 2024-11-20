import { obterTodosPosts } from "../model/postModel.js";

export async function obterPosts(req, res) {
    const posts = await obterTodosPosts()
    res.status(200).json(posts);
}