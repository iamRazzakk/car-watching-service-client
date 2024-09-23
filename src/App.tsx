import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { useRouter } from "./hooks/useRoutes";
import ScrollToTopButton from "./pages/ScrollToTopButton";

function App() {
  const router = useRouter();
  return (
    <>
      <Toaster />
      <ScrollToTopButton />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
