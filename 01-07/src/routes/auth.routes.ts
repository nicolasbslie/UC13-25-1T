import { Router } from "express"
import { AuthController } from "../controllers/AuthController"

const router = Router() //Objeto do router do Express (ele nos permite acessar os métodos para criar as rotas)
const authController = new AuthController() //Objeto da classe AuthController

router.post("/login", authController.login.bind(authController))

export default router