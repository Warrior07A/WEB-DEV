import myimage from "../images/myimage.png"
import video from "../images/video.png"
import photo from "../images/photo.png";
import article from "../images/article.png"
import "../index.css"
export function CreatePost() {
    return (
        <div >
            <div style={{ borderRadius: "0.8rem", display: "flex", backgroundColor: "white", border: "none", height: "4rem" }}>
                <div>
                    <img
                        style={{ borderRadius: "2rem", width: "2.5rem", padding: "0.8rem" }}
                        src={myimage} />
                </div>
                <div>
                    <button style={{ backgroundColor: "white", borderRadius: "1.2rem", border: "1px solid #B2B2B2", padding: "1.2rem", width: "30rem", height: "0.5rem", marginTop: "0.8rem" }}>
                        <div style={{ paddingRight: "23rem", marginTop: "-0.5rem" }}>
                            Start a post
                        </div>
                    </button>
                </div>

            </div>

            <div style={{ display: "flex", justifyContent: "space-around" }}>
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