import { Router } from "express";
import userRoute from "../modules/user/user.route";


const router = Router()
const moduleRoutes = [
    {
        path:"/blogs",
        route:userRoute
    }
]

moduleRoutes.forEach((route)=>router.use(route.path,route.route))
export default router