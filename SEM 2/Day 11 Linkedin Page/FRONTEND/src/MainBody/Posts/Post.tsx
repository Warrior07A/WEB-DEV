import { PiDotsThreeBold } from "react-icons/pi";
import { RxCross1 } from "react-icons/rx";
import { FaEarthAsia } from "react-icons/fa6";

export interface Ipost{
    pp : string, 
    pname : string,
    desc : string ,
    CreatedAt : string,
    content : string,
    contentimg? : string,
}

export function Post(props :  Ipost){
    return (
        <div style = {{backgroundColor : "white" , marginBottom : "1rem" , border : ".01rem solid #DFDEDA", borderRadius : ".5rem"}}>
            <div style = {{display : "flex"}}>
                <div style = {{margin : "1rem"}}>
                    <img
                    style = {{width : "2.5rem" , height  :"2.5rem" , borderRadius : "2rem"}}
                     src = {props.pp}/>
                </div>
                <div style = {{width : "25rem" , paddingTop  :".6rem" , marginBottom : ".1rem"}}>
                    <div>
                        <label
                            style = {{fontFamily : "system-ui", fontWeight : "500" , fontSize : "1rem" }}>
                                {props.pname}</label>
                    </div>
                    <div>
                        <label
                        style = {{ fontFamily : "system-ui", fontWeight : "400" , fontSize : ".8rem", color:"grey", 
                         }}>
                            {props.desc}</label>
                    </div>
                    <div  style = {{display : "flex"}}>
                        <div>
                            <label
                            style = {{ fontFamily : "system-ui", fontWeight : "400" , fontSize : ".8rem", color:"grey"}}>
                                {props.CreatedAt} h • </label>
                        </div>
                            <div style = {{color : "grey"}}>
                                <FaEarthAsia size = {12}/>
                            </div>

                    </div> 
                </div>
                <div style = {{display : "flex"}}>
                    <div style = {{padding : "1rem" , marginRight  :"-0.5rem"}}>
                        <PiDotsThreeBold/>
                    </div>
                    <div style = {{padding : "1rem"}}>
                        <RxCross1/>
                    </div>
                </div>
            </div>
            <div style = {{paddingLeft : "1rem" , paddingRight : "1rem" , paddingBottom : "1rem"}}>
                {props.content}
            </div>
            <div>
                <img  style = {{width : "100%" , height : "100%" }}
                    src = {props.contentimg}/>
            </div>
            <div style ={{height : "2rem" , backgroundColor : "red" }}>

            </div>
            <div style ={{height : "3rem" , backgroundColor : "green" }}>

            </div>
        </div>
    )
}

export default Post 