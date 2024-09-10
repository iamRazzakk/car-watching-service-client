import { createBrowserRouter } from "react-router-dom"
import MainLayouts from "../layouts/MainLayouts"
import { MainRoutes } from "../routes/main.routes"
import { AuthRouter } from "../routes/auth.routes"
import AuthLayout from "../layouts/AuthLayout"

export const userRouter = ()=>{
    return createBrowserRouter([
        {
            path:'/',
            element:<MainLayouts />,
            children: MainRoutes,
            errorElement:<h1 className="text-5xl font-bold text-center">ERROR</h1>
        },
        {
            path:'/auth',
            element:<AuthLayout />,
            children:AuthRouter,
            errorElement:<h1 className="text-5xl font-bold text-center">ERROR</h1>
        }
    ])
}