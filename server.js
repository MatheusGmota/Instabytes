import express from "express";

const posts = [
    {
        id: 1,
        descricao: "Uma foto",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 2,
        descricao: "Uma foto",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 3,
        descricao: "Uma foto",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 4,
        descricao: "Uma foto",
        imagem: "https://placecats.com/millie/300/150"
    },
]

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("Servidor escutando!");  
});

app.get("/posts", (req, res) => {
    res.status(200).json(posts);
});

function buscarPorId(id) {
    return posts.filter((p) => {
        return p.id === Number(id)}
    )
}

app.get("/posts/:id", (req, res) => {
    const post = buscarPorId(req.params.id)
    res.status(200).json(post);
});