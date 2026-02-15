import CreatePost from "./Posts/CreatePost";
import AddPost from "./Posts/AddPostDialog.tsx";
import {Feed} from "./Posts/Feed.tsx"
export function MidMain() {
    return (
        <div style = {{ width : "34rem"  ,height : "100vh"}}>
            <div style={{ borderRadius  : "0.7rem", backgroundColor : "white", border : "none" }}>
                <CreatePost/>
            </div>
            <div style = {{paddingBottom : "1rem" , paddingTop : "1rem" }}>
                <hr>
                </hr>
            </div>
            <div>
                {/* <AddPost/> */}
            </div>
            <div>
                <Feed/>
            </div>

        </div>


    )


}

export default MidMain;