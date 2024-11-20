import express from "express";
import routes from "./src/routes/postsRoutes.js";

const app = express();
routes(app)

app.listen(3000, () => {
    console.log("Servidor escutando", "\nRodando servido em: http://localhost:3000/");  
});