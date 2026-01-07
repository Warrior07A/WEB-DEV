import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import "./index.css"
import Landing  from "./Landing";
import Auth from "./Auth";
import Dashboard from "./Dashboard";



function App(){
    return(
    <div className="bg-[#0cb0e2]">
        <Router>
            <Routes>
            <Route path ="/" element={<Landing/>}/>
                <Route path ="/signin" element={<Auth/>}/>
                <Route path = "/dashboard" element={<Dashboard/>}/>
            </Routes>
        </Router>
    </div>
    );
}

export default App;
