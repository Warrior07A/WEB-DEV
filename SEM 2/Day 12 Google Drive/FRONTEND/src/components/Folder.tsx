import { useSearchParams } from "react-router-dom";

export default function Folder(  props : {title : string , id : string , ParentFolderId : string} ){
    const [searchParms , setsearchParams] = useSearchParams();

    function folderChange(){
        setsearchParams({folderId  : props.id})
        
    }
    return (
        <div >
            <div onClick={(e)=>{folderChange()}} className = " w-40 h-10 bg-amber-300 rounded text-center align-center cursor-pointer">
                <label> {props.title} </label>
            </div>
        </div>


    )   
}