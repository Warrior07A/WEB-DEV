interface blog{
    title : string,
    content : string
}

export default function Blog(props : blog){
    return (

        <div className="p-2 bg-amber-700 w-10 b-100 border border-amber-300 " >
            <h1> {props.title}</h1>
            <h1 className="w-full h-full "> {props.content}</h1>
        </div>
    )
}