import { RouterProvider } from "react-router-dom";
import { userRouter } from "./hooks/useRoutes";
import { Toaster } from "sonner";

function App() {
  const router = userRouter();
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
