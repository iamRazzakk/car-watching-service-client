import { createBrowserRouter } from "react-router-dom"
import MainLayouts from "../layouts/MainLayouts"
import { MainRoutes } from "../routes/main.routes"
import { AuthRouter } from "../routes/auth.routes"
import AuthLayout from "../layouts/AuthLayout"
import ErrorPage from "../pages/ErrorPage/ErrorPage"
import DashBoardLayout from "../layouts/DashBoardLayout"

export const userRouter = ()=>{
    return createBrowserRouter([
        {
            path:'/',
            element:<MainLayouts />,
            children: MainRoutes,
            errorElement:<ErrorPage />
        },
        {
            path:'/auth',
            element:<AuthLayout />,
            children:AuthRouter,
            errorElement:<ErrorPage />
        },
        {
            path:"/dashboard",
            element:<DashBoardLayout />,
            
        },
        
        {
            path:"*",
            element:<ErrorPage />
        }
    ])
}