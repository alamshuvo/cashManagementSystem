import { Router } from "express";


const userRoute = Router();

userRoute.get('/', (req, res) => {console.log(req,res);})


export default userRoute
