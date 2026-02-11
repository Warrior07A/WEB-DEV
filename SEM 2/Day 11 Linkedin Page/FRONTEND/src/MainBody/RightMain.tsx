export function RightMain(){
    return (
        <div style = {{  paddingLeft : "1rem" , backgroundColor : "white" , borderRadius : 10  , width  :"20rem"}}>
            <div>
                <div style = {{fontFamily : "system-ui" , fontWeight : "500", fontSize : "1.4rem" , lineHeight : "3rem" , color : "rgba(0, 0 ,0 ,0.9)" , paddingTop  :"0.3rem"}}>
                    LinkedIn News
                </div>
            </div>
            <div style = {{paddingBottom : ".5rem"}}>
                <label style = {{fontFamily : "system-ui" , fontWeight : "600" , lineHeight : "1rem", fontSize : "1rem"  , color  : "grey" }}>Top stories</label>
            </div>
            <div style = {{fontFamily : "system-ui" , fontWeight : "500" , lineHeight : "1rem", fontSize : ".8rem"  , overflow : "hidden" , textOverflow : "ellipsis"  }}>
                <News title = "Firms bet big on empathy" time = {4} reader = {278232}/>
            </div>
            <div>
                <News title = "What Gen Z truly values" time = {9} />
            </div>
            <div>
                <News title = "India ,UK sign social security pacr" time = {9} reader = {278}/>
            </div>
            <div>
                <News title = "Firms bet big on empathy" time = {9} reader = {278}/>
            </div>
            <div>
                <News title = "Firms bet big on empathy" time = {9} reader = {278}/>
            </div>
        </div>

    )

}

function News(props: any){
    return (
        <div>
            <div >
                <label style = {{fontFamily : "system-ui" , fontWeight : "500" , lineHeight : "1rem", fontSize : "1rem" , paddingBottom : ".5rem" }}>
                    {props.title}
                </label>
            </div>
            <div style = {{paddingBottom : ".5rem"}}>
                <label style = {{ fontFamily : "system-ui" , fontWeight : "400" , lineHeight : "1rem", fontSize : ".8rem"  , color  : "grey" }}> {props.time}h ago  •  {props.reader} readers </label>
            </div>
        </div>

    )
}

export default RightMain;