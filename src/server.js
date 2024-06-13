import express from 'express';
import exphbs from 'express-handlebars'; 
import path from 'path';

const app = express();
const PORT = 8080;

app.engine('.hbs', exphbs({ extname: '.hbs' })); 
app.set('view engine', '.hbs'); 
app.set('views', path.join(__dirname, 'views')); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
