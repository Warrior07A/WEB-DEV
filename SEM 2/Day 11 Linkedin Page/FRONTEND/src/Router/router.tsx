import {createBrowserRouter} from "react-router-dom";
import {App} from "../App"
import {SignUp} from "../Pages/Signin"

export const router  = createBrowserRouter([
    {path : "/signup" , element : <SignUp/>},
    {path : "/posts" , element : <App/> }
])