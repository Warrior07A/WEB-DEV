import MainBody from "./MainBody/MainBody";
import Topbar from "./Topbar/Topbar";
import "./index.css"

export function App(){
    return( 
    <div style = {{backgroundColor : "#F4F2EE" , height : "100vh"}}>
        <header  style = {{backgroundColor : "#FFFFFF"}}>
            <Topbar/>
        </header>
        <div style = {{marginTop : "20px" }}>
            <MainBody/>
        </div>

    </div>)
}

export default App;