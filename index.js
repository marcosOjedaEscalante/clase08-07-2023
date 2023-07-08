import express from 'express';
import { findAll } from './cursos.js';
const app = express();

app.set('view engine', 'hbs');

app.get('/', async (req, res) => {
    const arregloCursos = await findAll();
    res.render('cursos', {
        arregloCursos
    });
})

app.listen(8080);