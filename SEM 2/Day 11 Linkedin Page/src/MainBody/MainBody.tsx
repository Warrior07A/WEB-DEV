import { useState } from "react";
import backimage from "../images/bgimage.png";
import myimage from "../images/myimage.png";
import simg from "../images/simg.png"
import { FaBookmark } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { FaRegNewspaper } from "react-icons/fa";
import { FaRegCalendarMinus } from "react-icons/fa6";


import MidMain from "./MidMain";
import RightMain from "./RightMain";
export function MainBody() {
    const [profileviews, setpviews] = useState(100);
    const [postviews , setpostviews] = useState(69);
    return <>
        <div style={{ display: "flex", marginLeft: "10vw", marginRight: "10vw", marginTop: "4vh" }}>

            <div style={{ flex: 1.2, marginLeft: "2.7vw" }}>
                {/* profile image compoenent left side top */}
                <div style={{ backgroundColor: "white", borderRadius: "0.3rem", width: "14rem", "height": "15rem" }}>
                    <div  >
                        <img style={{ display: "block", width: "100%", borderRadius: "8px 8px 0 0" }} src={backimage} />
                    </div>
                    <div style={{ width: "2rem", height: "auto", }}>
                        <img style={{ marginLeft: "1.2vw", width: "9vh", marginTop: "-30px", borderRadius: "10rem", border: "2.5px solid white" }} src={myimage} />
                    </div>
                    <div style={{ margin: ".8rem", lineHeight: "25px", fontFamily: "system-ui", fontWeight: "60 0" }}>
                        <p style={{ fontWeight: "600", lineHeight: "16px", margin: "0.3rem" }}> Akshat Mittal</p>
                        <p style={{ fontSize: "12px", fontWeight: "400", lineHeight: "16px", margin: "0.3rem" }}>  Curious by Default. Engineer by Choice.</p>
                        <p style={{ fontSize: "12px", fontWeight: "20", lineHeight: "15px", margin: "0.3rem" }}>   Delhi </p>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <img style={{ borderRadius: "2rem", height: "2rem", width: "2rem" }} src={simg}></img>
                            <p style={{ fontSize: "12px", fontWeight: "600", lineHeight: "14px", margin: "0.3rem" }}>   100xSchool</p>
                        </div>
                    </div>

                </div>

                {/* 2nd component of left main body */}

                <div style={{
                    backgroundColor: "white", width: "13rem", height: "4rem", marginTop: "1rem", borderRadius: "10px",
                    fontSize: "0.6rem", padding: ".2rem", paddingLeft: "1rem"}}>
                        <div style = {{display : "flex" , justifyContent  : "space-between" , justifyItems : "center" , alignItems : "center" , width  :"12rem"}}>
                            <div style={{paddingTop :"0.5rem" , paddingBottom : "0.4rem" ,    fontFamily: "system-ui", fontWeight: "600", "lineHeight": "16px",fontSize  :".7rem" }}>
                                Profile Viewers 
                            </div>
                            <div style = {{ color : "#156DC5" , marginLeft : "-1rem" , fontWeight  :"600" , fontSize  :"0.8rem"}}>
                                {profileviews}
                            </div>
                        </div>
                        <div style = {{display : "flex" , justifyContent  : "space-between" , justifyItems : "center" , alignItems : "center" , width  :"12rem"}}>
                            <div style={{paddingTop :"0.5rem" , paddingBottom : "1rem" , fontFamily: "system-ui", fontWeight: "600", "lineHeight": "16px",fontSize  :".7rem  " }}>
                                Post impressions 
                            </div>
                            <div style = {{ color : "#156DC5" ,marginLeft : "-1rem" , fontWeight  :"600" , fontSize  :"0.8rem"}}>
                                {postviews}
                            </div>
                        </div>

                </div>

                {/* 3rd component of left main bodyStyle */}
                <div style={{ backgroundColor: "white", width: "14rem", height: "4rem", marginTop: "1rem",  borderRadius: "10px" }}>
                    <div style = {{paddingTop : "1rem" , marginLeft  :".7rem"}}>
                        <label  style = {{color : "grey"  ,fontWeight  :"400" , fontSize : ".78rem" , "lineHeight" : ".8rem" , fontFamily : "system-ui" }}> Grow professinally with Premium</label>
                    </div>
                    <div style = {{display : "flex" , alignItems : "center" , padding : 0 , marginTop : "-0.4rem" ,padding : 0 }}>
                        <div style = {{backgroundColor : "#E7A33E" , width :  ".7rem" , height : ".7rem",margin:"1rem"}}>

                        </div>
                        <div>
                        <label  style = {{fontWeight  :"600" , fontSize : ".7rem" , "lineHeight" : ".8rem" , fontFamily : "system-ui" }}>Try 1 month for ₹0</label>
                        </div>
                    </div>

                </div>


                <div style={{ backgroundColor: "white", width: "13rem", height: "8rem", marginTop: "1rem",  borderRadius: "10px",padding : ".5rem"}}>
                    <div style = {{padding  : ".4rem",display : "flex"  }}>
                        <div style = {{ paddingRight  :"1rem"}}>
                            <FaBookmark/>
                        </div>
                        <div>
                            <label style = {{ fontWeight  :"600" , fontSize : ".78rem" , "lineHeight" : ".8rem" , fontFamily : "system-ui" }}> Saved items</label>
                        </div>
                    </div>
                    
                    <div style = {{padding  : ".4rem", display : "flex" }}>
                        <div style = {{ paddingRight  :"1rem"}}>
                            <MdGroups/>
                        </div>
                        <div>
                            <label style = {{ fontWeight  :"600" , fontSize : ".78rem" , "lineHeight" : ".8rem" , fontFamily : "system-ui" }}>  Groups</label>
                        </div>
                    </div>
                    
                    <div style = {{padding  : ".4rem", display : "flex" }}>
                        <div style = {{ paddingRight  :"1rem"}}>
                            <FaRegNewspaper/>
                        </div>
                        <div>
                            <label style = {{ fontWeight  :"600" , fontSize : ".78rem" , "lineHeight" : ".8rem" , fontFamily : "system-ui" }}> Newsletter </label>
                        </div>
                    </div>

                    <div style = {{padding  : ".4rem", display : "flex" }}>
                        <div style = {{ paddingRight  :"1rem"}}>
                            <FaRegCalendarMinus/>
                        </div>
                        <div>
                            <label style = {{ fontWeight  :"600" , fontSize : ".78rem" , "lineHeight" : ".8rem" , fontFamily : "system-ui" }}> Events</label>
                        </div>
                    </div>

                </div>
            </div>


            <div style={{ display: "flex", flex: 4, justifyContent: "center" }}>
                <MidMain />
            </div>



            <div style={{ flex: 1 }}>
                <RightMain/>
            </div>

        </div>
    </>
}

export default MainBody;