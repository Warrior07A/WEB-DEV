import myimage from "../../images/myimage.png"
import video from "../../images/video.png"
import photo from "../../images/photo.png";
import article from "../../images/article.png"
import "../../index.css"

import { useEffect, useState } from "react";
import AddPost from "./AddPostDialog";
export function CreatePost() {

    const [dialog , setdialog] = useState(0);

    function dialogpopup(){
        if (!dialog){
            setdialog(1);
        }
        // else setdialog(1);
    }
    const DialogClose = (e : any)=>{
        if (e.key == 'Escape' ){
            if (dialog) {
                setdialog(0);
            }
        }
    }
    useEffect(()=>{
        window.addEventListener('keydown' , DialogClose);
    },[dialog])
    return (
        <div style = {{border : ".01rem solid #DFDEDA", borderRadius : ".5rem"}}>
            <div style={{ borderRadius: "0.8rem", display: "flex", backgroundColor: "white", height: "4rem" }}>
                <div>
                    <img
                        style={{ borderRadius: "2rem", width: "2.5rem", padding: "0.8rem" }}
                        src={myimage} />
                </div>
                <div>
                    <button  onClick={dialogpopup}
                        style={{ backgroundColor: "white", borderRadius: "1.5rem", border: "1px solid #B2B2B2", padding: "1.2rem", width: "28rem", height: "3rem", marginTop: "0.8rem" }}>
                        <div style={{ paddingRight: "21rem", marginTop: "-0.3rem" }}>
                            Start a post
                        </div>
                        {dialog ? <AddPost/> : null }
                    </button>
                </div>

            </div>
        
            <div style={{ display: "flex", marginTop : "1rem", justifyContent: "space-around" }}>
                <div >
                    <div className="postbtn" style={{ border: "none", backgroundColor: "#FFFFFF" , display :"flex" , justifyContent : "center"  , alignItems : "center" }}>
                        <div>
                            <img style = {{paddingRight : "0.6rem"}}src={video} />
                        </div>
                        <div style ={{marginTop : "-0.3rem"}}>
                            <label style = {{fontFamily : "system-ui" , fontWeight : "600" , "fontSize" : "14px" , lineHeight : "28px", color : "grey" }}> Video</label>
                        </div>

                    </div>

                </div>
                <div >
                    <div className="postbtn" style={{ border: "none", backgroundColor: "#FFFFFF" , display :"flex" , justifyContent : "center"  , alignItems : "center"}}>
                        <div>
                            <img style = {{paddingRight : "0.6rem"}} src={photo} />
                        </div>
                        <div style ={{marginTop : "-0.3rem"}}>
                            <label style = {{fontFamily : "system-ui" , fontWeight : "600" , "fontSize" : "14px" , lineHeight : "28px" , color : "grey"}}> Photo</label>
                        </div>

                    </div>

                </div>
                <div >
                    <div className="postbtn" style={{ border: "none", backgroundColor: "#FFFFFF" , display :"flex" , justifyContent : "center"  , alignItems : "center"}}>
                        <div>
                            <img style = {{paddingRight : "0.6rem"}} src={article} />
                        </div>
                        <div style ={{marginTop : "-0.3rem"}}>
                            <label style = {{fontFamily : "system-ui" , fontWeight : "600" , "fontSize" : "14px" , lineHeight : "28px" , color : "grey"}}> Write article</label>
                        </div>

                    </div>

                </div>
            </div>


        </div>

    )
}

export default CreatePost