import express from 'express';
const app = express();

// Importar modelos
import Aparelho from './models/Aparelho.js';
import Instrutor from './models/Instrutor.js';
import Aluno from './models/Aluno.js';
import Exercicio from './models/Exercicio.js';

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

// Public
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(__dirname + '/public'));

// ====================== ROTAS ====================== //

// --- HOME ---
app.get('/', async (req, res) => {
  try {
    const aparelho = await Aparelho.find();
    const instrutor = await Instrutor.find();
    const aluno = await Aluno.find();
    const exercicio = await Exercicio.find();

    res.render('index', { aparelho, instrutor, aluno, exercicio });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao carregar a home");
  }
});

// ====================== APARELHO ====================== //
app.get('/aparelho/lst', async (req, res) => {
  const aparelho = await Aparelho.find();
  res.render("aparelho/lst", { aparelho });
});

app.post('/aparelho/lst', async (req, res) => {
  const pesquisa = req.body.pesquisa;
  const aparelho = await Aparelho.find({ nome: { $regex: pesquisa, $options: "i" } });
  res.render("aparelho/lst", { aparelho });
});

app.get('/aparelho/add', async (req, res) => {
  const aparelho = await Aparelho.find();
  res.render("aparelho/add", { aparelho });
});

app.post('/aparelho/add/ok', async (req, res) => {
  await Aparelho.create(req.body);
  res.render("aparelho/addok");
});

app.get('/aparelho/edt/:id', async (req, res) => {
  const aparelho = await Aparelho.findById(req.params.id);
  res.render("aparelho/edt", { aparelho });
});

app.post('/aparelho/edt/:id', async (req, res) => {
  await Aparelho.findByIdAndUpdate(req.params.id, req.body);
  res.render("aparelho/edtok");
});

app.get('/aparelho/del/:id', async (req, res) => {
  await Aparelho.findByIdAndDelete(req.params.id);
  res.redirect("/aparelho/lst");
});

// ====================== INSTRUTOR ====================== //
app.get('/instrutor/add', async (req, res) => {
  const instrutor = await Instrutor.find();
  res.render("instrutor/add", { instrutor });
});



app.post('/instrutor/add/ok', async (req, res) => {
  try {
    await Instrutor.create({
      nome: req.body.nome,
      cpf: req.body.cpf,
      telefone: req.body.telefone,
      email: req.body.email,
      especialidade: req.body.especialidade,
      fotoBase64: req.body.fotoBase64
    });
    res.render("instrutor/addok");
  } catch (error) {
    console.error(error);
    res.send("Erro ao criar instrutor: " + error);
  }
});

app.get('/instrutor/lst', async (req, res) => {
  const instrutor = await Instrutor.find();
  res.render("instrutor/lst", { instrutor });
});

app.post('/instrutor/lst', async (req, res) => {
  const pesquisa = req.body.pesquisa;
  const instrutor = await Instrutor.find({ nome: { $regex: pesquisa, $options: "i" } });
  res.render("instrutor/lst", { instrutor });
});

app.get('/instrutor/edt/:id', async (req, res) => {
  const instrutor = await Instrutor.findById(req.params.id);
  res.render("instrutor/edt", { instrutor });
});

app.post('/instrutor/edt/:id', async (req, res) => {
  await Instrutor.findByIdAndUpdate(req.params.id, req.body);
  res.render("instrutor/edtok");
});

app.get('/instrutor/del/:id', async (req, res) => {
  await Instrutor.findByIdAndDelete(req.params.id);
  res.redirect("/instrutor/lst");
});

// ====================== ALUNO ====================== //
app.get('/aluno/lst', async (req, res) => {
  const aluno = await Aluno.find();
  res.render("aluno/lst", { aluno });
});

app.post('/aluno/lst', async (req, res) => {
  const pesquisa = req.body.pesquisa;
  const aluno = await Aluno.find({ nome: { $regex: pesquisa, $options: "i" } });
  res.render("aluno/lst", { aluno });
});

app.get('/aluno/add', (req, res) => res.render("aluno/add"));

app.post('/aluno/add/ok', async (req, res) => {
  await Aluno.create(req.body);
  res.render("aluno/addok");
});

app.get('/aluno/edt/:id', async (req, res) => {
  const aluno = await Aluno.findById(req.params.id);
  res.render("aluno/edt", { aluno });
});

app.post('/aluno/edt/:id', async (req, res) => {
  await Aluno.findByIdAndUpdate(req.params.id, req.body);
  res.render("aluno/edtok");
});

app.get('/aluno/del/:id', async (req, res) => {
  await Aluno.findByIdAndDelete(req.params.id);
  res.redirect("/aluno/lst");
});

// ====================== EXERCICIO ====================== //
app.get('/exercicio/lst', async (req, res) => {
  const exercicio = await Exercicio.find();
  res.render("exercicio/lst", { exercicio });
});

app.post('/exercicio/lst', async (req, res) => {
  const pesquisa = req.body.pesquisa;
  const exercicio = await Exercicio.find({ nome: { $regex: pesquisa, $options: "i" } });
  res.render("exercicio/lst", { exercicio });
});

app.get('/exercicio/add', (req, res) => res.render("exercicio/add"));

app.post('/exercicio/add/ok', async (req, res) => {
  await Exercicio.create(req.body);
  res.render("exercicio/addok");
});

app.get('/exercicio/edt/:id', async (req, res) => {
  const exercicio = await Exercicio.findById(req.params.id);
  res.render("exercicio/edt", { exercicio });
});

app.post('/exercicio/edt/:id', async (req, res) => {
  await Exercicio.findByIdAndUpdate(req.params.id, req.body);
  res.render("exercicio/edtok");
});

app.get('/exercicio/del/:id', async (req, res) => {
  await Exercicio.findByIdAndDelete(req.params.id);
  res.redirect("/exercicio/lst");
});

// ====================== SERVER ====================== //
app.listen(3001, () => console.log("Servidor rodando na porta 3001"));

export default app;
