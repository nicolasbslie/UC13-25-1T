O que é o JWT? O que significa?

JWT significa Json Web Token. Ele é um código gerado e salvo no navegador que, entre outras coisas, guarda as informações de um usuário(exemplo: `{id: 1, email: Gabriel Noronha}`)

Como ele se parece? Ele se parece com isso aqui:
`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhbGljZUBtYWlsLmNvbSJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`

Para o que ele serve? Ele serve para guardar informações de qual usuário está logado. Assim, nós podemos fazer requisições (exemplo, criar um post) sem pedir para que logue novamente toda vez. Também podemos garantir que um usuário crie, atualize, delete posts APENAS PARA SI MESMO ou veja apenas as SUAS informações e não a de outros, etc.

Por exemplo: vamos pensar no funcionamento de uma rede social. Imagine que você acessa o Instagram e quer criar um post. Você primeiro precisa ter uma conta e logar com ela. Nós usamos o jwt, justamente para fazer isso: logar. Outra coisa, você só consegue criar posts para SI MESMO. Não há como criar ou deletar, por exemplo, o post de OUTRO USUÁRIO. O JWT também garante isso, pois ele informa qual o id do usuário que está logado.

O token em si é dividido em três partes. As mais importantes para nós são as duas últimas: o Payload e a Signature.

O payload é a parte do meio. É ali que fica armazenado as informações como o id e email do usuário

O Signature é a terceira parte. Ali fica armazenado o "segredo", que é um código que cada sistema tem o seu. Ele garante que aquele token pertence aquele sistema. Se for modificado, por exemplo, ele é inválido. Isso evita que uma pessoa pegue qualquer token e tente usar em nosso sistema.

Como utilizar no nosso projeto? Vamos lá:

1 - Primeiro é preciso instalar as depêndencias:

```bash
    npm install jsonwebtoken @types/jsonwebtoken
```

2 - Para usarmos o JWT, agora vamos criar um arquivo chamado `jwt.ts` dentro da pasta `utils`.

Dentro deste arquivo, precisamos então:

    2.1 - importar tudo que é necessário: o jwt e também o dotenv (pois teremos variáveis importantes lá):
```ts
    import jwt from 'jsonwebtoken'
    import * as dotenv from 'dotenv'
```

    2.2 - precisamos carregar as variáveis do .env para o objeto process.env (ele é quem nos fornece os valores depois)

    ```ts
    dotenv.config() //sem isso aqui, não temos acesso as variáveis do .env

    // Pegamos então as variáveis do .env
    // Use sempre o MESMO NOME e na MESMA ORDEM que estão no .env
    const {JWT_SECRET, JWT_EXPIRES_IN} = process.env
    ```

    2.3 - No .env, precisamos ter as variáveis correspondentes:

    ```ts
    DB_HOST=localhost

    DB_PORT=3306
    DB_USER=root
    DB_PWD=root
    DB_NAME=rede_social

    PORT=3000
    //Estas são as novas variáveis do ambiente
    JWT_SECRET=minhaChaveMuitoSecreta // Serve para converter depois na assinatura do token (signature)
    JWT_EXPIRES_IN=86400 //Identifica por quanto tempo o token é válido (nesse caso, um dia: 86400 segundos)
    ```


    2.4 - Voltando ao arquivo jwt.ts, vamos criar uma interface chamada Payload para representar o que nós esperamos que nosso token receba:

    ```ts
    interface Payload {
        id:number
        email:string
    }
    ```

    2.5 - Agora, vamos criar uma função que GERA um novo token. Geralmente chamamos esse método dentro de uma função login, etc.

    ```ts
    // Nunca se esqueça do 'export' ou não podermos usar esta função em outros arquivos
    // Nosso método recebe por parâmetro um objeto que deve ter id e email (por causa da nossa interface)
    export function generateToken(payload:Payload){
        // O método sign() da biblioteca do jwt serve para criar um novo token
        // Para isso, passamos para ele, nesta ordem:
        // 1 - O payload com as informações do usuário
        // 2 - o 'segredo' que está no JWT_SECRET
        // 3 - Um objeto (ou seja, entre 'chaves':{}) que contém a opção 'expiresIn', com o valor do JWT_EXPIRES_IN. ATENÇÃO: se estiver no .env algo como 'JWT_EXPIRES_IN', no sign() você precisa chamá-lo dentro de 'Number()' para convertê-lo
        return jwt.sign(payload, JWT_SECRET!, {
            expiresIn: Number(JWT_EXPIRES_IN)
        })
        //O argumento com o JWT_SECRET tem um '!' no final pois o TypeScript sabe que pode ser que o .env não tenha essa informação. Ao colocar o ponto de exclamação, é como se disséssemos: "Tem sim, confia"
    }
    ```

    2.6 - Criamos a função que gera o token. Agora vamos criar a função que analisa se ele é válido ou não:

    ```ts
        // O token vem no formato de string mesmo
        export function verifyToken(token:string){
            try{
                // Chamamos a função verify() da biblioteca do jwt para fazer a verificação
                // O primeiro argumento é o próprio token
                // O segundo é o JWT_SECRET
                // Se for válido, a função retorna as infos do usuário
                return jwt.verify(token, JWT_SECRET!)
            } catch {
                // Se não for, retorna nulo
                return null
            }
        }
    ```

    EXTRA: se quiser testar, no mesmo arquivo você pode chamar os dois métodos, primeiro o generate e depois o verify:

    ```ts
        //Gere um token com as infos que quiser
        const token = generateToken({id: 1, email:"leo@gmail"})
        // Mostre o token no terminal
        console.log(token)

        // Depois, confira se o token é válido (se for o token que acabamo de gerar, sempre vai ser válido)
        const tokenValido = verifyToken(token)
        console.log(tokenValido) // Se mostrar as infos do usuário ele é válido, se mostrar null, não é
    ```
    Depois, rode com o comando:

    ```bash
        ts-node-dev src/utils/kwt.ts
    ```

PASSO 3 - Se não tivermos uma função que procura por email no UserRepository, precisamos criá-la. Se já tem, podemos pular esta etapa. Vá até UserRepository e adicione a seguinte função:

    ```ts
        async findByEmail(email: string){
            // findOne() é uma função do TypeORM que retorna um único resultado(se usássemos apenas find() ele retornaria um Array!)
            return repo.findOne({ where:email })
        }
    ```

PASSO 4 - Na camada Service, vamos precisar adicionar mais algumas coisas.
    4.1 - Adicionar uma extensão da classe `Error` que vamos dar o nome de `UnauthorizedError` (Unauthorized = Não autorizado). Adicione a seguinte linha em `UserService.ts`:

    ```ts
        //Não é obrigatório criar essa classe filha de Error. Porém, ao fazermos isso, quando este erro for lançado, sabemose EXATAMENTE do que se trata
        export class UnauthorizedError extends Error{}
    ```

    4.2 - Vamos adicionar o método de login dentro de `UserService.ts`. Este método vai receber um email e uma senha, validar se existe o email usando o `UserRepository.findByEmail()` que criamos há pouco, depois valida através do método bcrypt.compare() se a senha bate a criptografia dela do banco, e, se tudo estiver de acordo, ai sim gera um token chamando o método `jwt.generateToken()` que nós criamos antes. Então, no arquivo `UserService.ts` crie:

    ```ts
        // recebe email e senha como parâmetros
        async login(data: {email:string, password:string}){
            // verificamos se o email existe
            // precisamos do await já que o método findByEmail é async (ele precisa de um tempo para buscar as informações no banco)
            const user = await UserRepository.findByEmail(data.email)

            //Verificamos se a senha está correta
            // data.password pega a senha que enviamos como parâmetro (no front ela vira através de um input por exemplo)
            // user.password pega a senha que está no objeto `user`, que é o usuário que encontramos com o método findByEmail, que retorna um user
            const isValid = await bcypt.compare(data.password, user.password)

            if(!isValid || password) throw new NotFoundError("Informações incorretas")

            // Geramos um token válido para o usuário
            const token = jwt.generateToken({
                user.id,
                user.email
            })

            console.log(token)

            return {
                user: omitPassword(user), //Chamando este método que criamos anteriormente, a senha do user não aparece na resposta do servidor
                token
            }
        }
    ```

    PASSO 5 - Agora, depois de Services, vamos para a camada Controllers, onde vamos criar um arquivo chamado `AuthController.ts`. Ele ficará responsável pela parte do login. Dentro dele, insira:

    5.1 - As importações:

    ```ts
        import { Request, Response, NextFunction } from 'express'
        import { UserService } from '../services/UserService.ts'
    ```

    5.2 - O método de login:

    ```ts
        export class AuthController {
            async login (req: Request, res: Response, next: NextFunction){
                try{
                    //precisamos extrair o email e a senha pelo corpo da requisição:
                    const {email, password} = req.body // lembrem-se: sempre na ordem, e com o mesmo nome

                    // Chamamos o método de login da camada services:
                    const result = await UserService.login({email, password}) //lembre-se que esse método retorna um objeto com o usuário sem senha e o token

                    //Enviamos o resultado, seja ele qual for, no formato json com o status 200 (OK)
                    return res.status(200).json(result)
                } catch (error){
                    next(error) // Chamamos assim para enviar o erro para o middleware errorHandler (next é tipo um "passa para outro resolver". O error Handler captura qualquer erro que for "lançado pro próximo")
                }
            }
        }
    ```

    PASSO 6 - Agora, precisamos criar a rota do Auth. Porém, ao contrário do que fazíamos antes, não vamos por todas as rotas em um único arquivo. Vamos dividi-las entre: rotas de auth, rotas de user, rotas de post e ai um arquivo principal que reúne todas elas. Vamos lá:

        6.1 - Em 'routes', crie um arquivo chamado `auth.routes.ts`. Dentro dele, coloque as importações:

        ```ts
            import { Router } from "express"
            import { AuthController } from "../controllers/AuthController"
        ```

        6.2 - Crie o objeto router e o authController:

        ```ts
            const router = Router() //Objeto do router do Express (ele nos permite acessar os métodos para criar as rotas)
            const authController = new AuthController() //Objeto da classe AuthController
        ```

        6.3 - Criamos a rota:

        ```ts
            router.post("/login, authController.login.bind(authController)")

            export default router
        ```

        6.4 - Agora precisamos ir até index.ts e chamar as rotas de auth lá:

        ```ts
            import authRoutes from "./auth.routes"

            const router = Router()
            // O index agora chama as rotas criadas em auth.routes.ts
            router.use("/auth", authRoutes)

            export default router
        ```