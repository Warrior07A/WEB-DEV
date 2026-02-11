import { useState } from "react";
import Tab from "./Tab";
import { IoSearch } from "react-icons/io5";
import { IoHomeSharp } from "react-icons/io5";
import { BsFillPeopleFill } from "react-icons/bs";
import { FiMessageCircle } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import { BiSolidBriefcase } from "react-icons/bi";
import myimage from "../images/myimage.png"
import { CgLayoutGridSmall } from "react-icons/cg";

import Linkedin from "../images/linkedin.png";



export function Topbar() {
    // const [net, setnet] = useState(0);
    // const [mess, setmess] = useState(0);
    // const [noti, setnoti] = useState(0);
    // const [job, setjob] = useState(0);

    // function addnet() {
    //     setnet(net => net + 1);
    // }
    // function addmess() {
    //     setmess(mess => mess + 1);
    // } function addnoti() {
    //     setnoti(noti => noti + 1);
    // } function addjob() {
    //     setjob(job => job + 1);
    // }
    return (

        <div style={{
            display: "flex", justifyContent: "space-around", maxHeight: "3rem",
            paddingTop: "0px", backgroundColor: "#FFFFFF", margin: 0
        }}>

            <div style={{ marginLeft: "150px", marginTop: ".1rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img style={{ height: "3rem", width: "3rem" }} src={Linkedin} />
                <div style={{ borderRadius: "10rem", border: "1px groove grey", "height": "2rem", "width": "17rem" }}>
                    <div style={{ paddingLeft: "1rem", paddingTop: ".5rem" }}>
                        <IoSearch />
                        <input
                            style={{ border: "none", marginTop: ".1rem", paddingTop: ".1rem", outline: "none" }}
                            type="text" placeholder=" Search"
                        />
                    </div>

                </div>
            </div>

            <div style={{ display: "flex", marginRight: "0rem", paddingRight: "10rem", paddingTop: "2px", justifyContent: "center", "alignItems": "center" }}>
                <Tab title="Home" style={{ Padding: "100px" }} icon={
                    <IoHomeSharp size={20} />
                } />
                <Tab title="My Network" style={{ Padding: "100px" }} icon={
                    <BsFillPeopleFill size={20} />
                } />

                <Tab title="Jobs" style={{ Padding: "100px" }} icon={
                    <BiSolidBriefcase size={20} />
                } />
                <Tab title="Messaging" style={{ Padding: "100px" }} icon={
                    <FiMessageCircle size={20} />
                } />
                <Tab title="Notifications" style={{ Padding: "100px" }} icon={
                    <FaBell size={20} />
                } />
                <div style={{ paddingLeft: "1rem", borderRight: "0.1rem solid #E8E8E8", paddingRight: "1rem" }}>
                    <div >
                        <img style={{ borderRadius: "2rem", width: "1.3rem", height: "1.3rem" }} src={myimage} ></img>
                    </div>
                    <div>
                        <label style={{ fontFamily: "system-ui", "fontWeight": "400", color: "grey", fontSize: "12px" }}> Me</label>
                        <select style={{ border: "none" }} name="Me"></select>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", marginLeft: "2rem", marginRight: "1rem" }}>
                    <div style={{ marginBottom: "-0.9rem", color: "grey" }}>
                        <CgLayoutGridSmall size={40} />
                    </div>
                    <div style={{ display: "flex" , marginTop : "0.4rem"}}>
                        <label style={{ marginLeft: "-0.4rem ", fontFamily: "system-ui", "fontWeight": "400", color: "grey", fontSize: "12px", paddingTop: 0 }}>
                            For Business
                        </label>
                        <select style={{ border: "none", width: "1rem", height: "1rem", marginTop: "-100rem" }} name="Me"></select>
                    </div>
                </div>
                <div>
                    <div style = {{marginLeft : "2rem" , width  :"1.5rem" , height  :"1.5rem" , backgroundColor : '#C37D16' }}>
                    </div>
                    <div>
                        <label style={{ marginLeft: "-0.4rem ", fontFamily: "system-ui", "fontWeight": "400", color: "grey", fontSize: "12px", marginTop: "-0.7rem", paddingTop: 0 }} >
                        Try Premium for ₹0
                        </label>

                    </div>

                </div>

            </div>
        </div>



    )
}

export default Topbar;