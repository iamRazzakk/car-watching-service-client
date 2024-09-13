import SignupForm from "../components/Auth/SingupForm";
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