import SignupForm from "../components/Auth/SignupForm";
import SingInForm from "../components/Auth/SingInForm";

export const AuthRouter = [
    {
        path:"singup",
        element:<SignupForm />
    },
    {
        path:"login",
        element:<SingInForm />
    }
]