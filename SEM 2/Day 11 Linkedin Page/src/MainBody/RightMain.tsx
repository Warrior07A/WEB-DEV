export function RightMain(){
    return (
        <div style = {{backgroundColor : "white"}}>
            <div>
            
                <div>
                    LinkedIn News
                </div>
                <div>
                    
                </div>
            </div>
            <div>
                Top stories
            </div>
            <div>
                <News title = "Firms bet big on empathy" time = {9} reader = {278}/>
            </div>

            <div style={{ width: "301px", height: "469px", border: "2px solid black", borderRadius: "10px" }}></div>
        </div>

    )

}

function News(props: any){
    return (
        <div>
            <div>
                <label >
                    {props.title}
                </label>
            </div>
            <div>
                <label> {props.time}h ago  •  {props.reader} readers </label>
            </div>
        </div>

    )
}

export default RightMain;