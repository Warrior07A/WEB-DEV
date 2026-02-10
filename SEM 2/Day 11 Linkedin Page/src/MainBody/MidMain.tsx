import CreatePost from "./CreatePost";


export function MidMain() {
    return (
        <div style = {{ width : "35rem"  ,height : "100vh"}}>
            <div style={{ borderRadius  : "1rem", backgroundColor : "white", border : "none" }}>
                <CreatePost/>
            </div>


        </div>


    )


}

export default MidMain;