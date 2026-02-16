import { BrowserRouter , Routes , Route } from "react-router-dom";
import { SignUp } from "./Pages/SignUp";
import { Home } from "./Pages/Home";
import "./index.css"
import { SignIn } from "./Pages/Signin";

export function App(){
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path = "/signup"  element = {<SignUp/>} ></Route>
                    <Route path = "/signin" element = {<SignIn/>} > </Route>
                    <Route path = "/home"  element ={<Home/>} ></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;