import "./index.css";
import sideimage from "./assets/sideimage.png";

function Landing(){
    return(

    <div className=" h-screen w-screen bg-gradient-to-r from-red-500 to to-orange-400 flex flex-col align-middle">
        <div className="flex-col">
            nvdfvbdsn
        </div>
        <div className="w-7/8 h-screen bg-white p-100 m-20 rounded-2xl">

        <div>
        <div>   
            <h1 className="text-xl flex flex-col align-center content-center font-light"> CREATE YOUR TODOS</h1>
            {/* <h2>Start Today .. Start Early !</h2>
            <h2> There is no tomorrow !</h2> */}
        </div>
        <div className="text-6xl flex flex-col">
            <a href="signin"><button>Click here 👈️</button> </a>        
        </div>      
        </div>

        <div>
            <img src = {sideimage}/>
        </div>
            </div>
        
    </div>
    );
}

export default Landing;
