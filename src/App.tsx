import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { useRouter } from "./hooks/useRoutes";

function App() {
  const router = useRouter();
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
