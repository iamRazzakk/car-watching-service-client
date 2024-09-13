import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className='font-Josefin'>
        <Provider store={store}>
        <App />
        </Provider>
    </div>
  </StrictMode>
);
