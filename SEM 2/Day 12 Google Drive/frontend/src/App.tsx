import { BrowserRouter, Routes , Route } from "react-router-dom";
import Signup from "../Pages/Signup";
import "./index.css"
import Signin from "Pages/Signin";
import Home from "Pages/Home" ;

export function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>    
            <Route path = "/signup" element ={<Signup/>}/>
            <Route path = "/signin" element = {<Signin/>}/>
            <Route path = "/home" element = {<Home/>}/>
        </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
