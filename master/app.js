const express = require('express')
const app = express()
const port = 3000

//rota rais

app.use(express.static("23528_modules"));
app.set("views", "./views");
app.set("view engine", "ejs");


app.get("/principal", (req, res) => {
    res.render("formulario_LOGIN_SENHA");
});

app.get("/calculo", (req, res) => {
    res.render("calculando");

    const operacoes = require('./operacoes')
    const a = 10
    const b = 34
    const c = 100
    const object = new operacoes(a, b, c)
    const media = object.media()

    console.log("valor do a: " + a);
    console.log("valor do b: " + b);
    console.log("valor do c: " + c);
    console.log("valor da media : " + media);
});

app.get('/', (req,res) =>{
    res.send('ta online isso, use o /calculo ou o /principal')
})

//porta
app.listen(port, () =>{
    console.log(`servidor na porta ${port}`)
})

// objeto

