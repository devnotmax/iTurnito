import express, { Router } from 'express';
import { getUser, loginUser, registerUser, getUserbyId } from '../controllers/usersController';


const router: Router = express.Router();

// GET /users => obetener todos los usuarios ✔
// GET /users/:id => obtener un usuario por su id ✔
// POST /users/register => crear un usuario ✔
//POST /users/login => iniciar sesion en la aplicacion ✔

router.get("/", getUser);
router.get("/:id", getUserbyId);

router.post("/register", registerUser); 
router.post("/login", loginUser);

export default router;
