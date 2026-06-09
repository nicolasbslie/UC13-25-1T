import express from 'express';

/*
    Cria o objeto express.
    Através dele vamos ter acesso a metódos que nos permitem criar o nosso servidor    
*/

const app = express()
const PORTA = 3000
/*
    Aqui embaixo informamos que nosso servidor vai receber e enviar os dados em JSON
*/
app.use(express.json())
/*
    Aqui vamos criar a nossa primeira rota. Rotas são funções que criamos que, quando alguém a chama, faz uma requisição
*/

//Rota para pegar uma informação e precisa de pelo menos 2 pârametros
//O primeiro é o caminho
//O segundo é uma função que é chamada quando acessar a rota
//A função também precisa de 2 parâmetros: req e res
// "req" é a requisição e "res" a resoista do servidor
app.get("/servidor", (req, res) => {
    //Significa que o servidor vai enviar um código de sucesso (o número 200)
    //res.status(200).send("mensagem") é o que envia a resposta inteira
    res.status(200).send("Servidor rodando!") 
})

//É o que inicia o servidor
/*
    A função listen precisa de 2 parâmetros
    - o primeiro é a porta
    - o segundo é uma função que vai ser chamada quando o servidor rodar.
 */
app.listen(PORTA, () =>{
    console.log("Servidor no ar!")
})

//http://localhost:3000/servidor

/*
    Crie uma nova rota que retorne o seu nome
*/

app.get("/nome", (req, res) => {
    res.status(200).send("Meu nome é Nicolas")
})

app.listen(PORTA, () => {
    console.log("Servidor do nome no ar")
})
//http://localhost:3000/nome