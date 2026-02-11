import { Home } from 'lucide-react';
import { Network } from 'lucide-react';
import "../index.css"
export function Tab(props : any){
    return (
        <div style = {{ display : "flex" ,  justifyContent : "center",minWidth : "1.8rem", height : "2rem",  
         color: "grey" ,  flexDirection : "column" , padding : "1rem" }}>
            <div className="NavHover">   
                {props.icon}
            </div>
            <div style = {{display : "flex"  , maxWidth : "100px" , alignItems : "center" ,flexWrap : "wrap",
                fontFamily : "system-ui" , "fontWeight" : "400" , fontSize : "12px"
             }}>    
                {props.title}
                
            </div>
        </div>
    )
}

export default Tab;