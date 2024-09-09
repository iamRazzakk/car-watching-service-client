import { RouterProvider } from "react-router-dom"
import { userRouter } from "./hooks/useRoutes"



function App() {
const router = userRouter()
  return (
    <>
      <RouterProvider  router={router}/>
    </>
  )
}

export default App
