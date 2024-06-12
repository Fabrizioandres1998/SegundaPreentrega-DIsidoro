import express from "express";
import indexRoutes from "./routes/index.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("<h1> Bienvenido a mi API </h1>");
});
app.use("/api", indexRoutes);

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto http://localhost:${PORT}`);
});