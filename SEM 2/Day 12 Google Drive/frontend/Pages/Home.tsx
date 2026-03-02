import { useEffect, useState } from "react";
import "../src/index.css";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import Folder from "../src/components/Folder";

interface Ifolder {
    title: string,
    ParentFolderId: string,
    id: string
}
export function Home() {
    const Navigate = useNavigate();
    
    const [farr, setfarr] = useState<Ifolder[]>([]);
    const [folderdialog, setdisplay] = useState(0);
    const [Fname, setFname] = useState("");

    const [filedialog, setfdialog] = useState(0);
    const [file,setfile] = useState<File | null> (null);

    const [searchParms, setsearchParams] = useSearchParams();
    
    let folderId: null | string;


    useEffect(() => {
        folderId = searchParms.get("folderId");
        if (!folderId) folderId = null;
        getfolder();
    }, [searchParms])



    async function getfolder() {
        console.log("hi");
        const url = window.location.search;
        console.log(url);
        const token = localStorage.getItem("token");
        console.log("gfhj", token);
        let res = await axios.get("http://localhost:3001/drive/folder" + url, {
            headers: {
                'Content-Type': "application/json",
                'Authorization': token
            }
        });
        console.log(res.data.folder);
        if (res.data) {
            let arr = res.data.folder.map((folder: any) => {
                return {
                    id: folder.id,
                    title: folder.title,
                    ParentFolderId: folder.ParentFolderId
                }
            })
            setfarr(arr);
        }
    }

    async function CreateFolder() {
        let queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let newfolderId = urlParams.get("folderId");
        if (newfolderId) folderId = newfolderId;

        if (Fname == "") {
            alert("Folder name cannot be empty")
            return;
        }

        const res = await axios.post("http://localhost:3001/drive", {
            title: Fname,
            type: "FOLDER",
            ParentFolderId: folderId
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            }
        })
        // alert(Fname + " has been created");
        setFname("");
        setdisplay(0);
        getfolder();
    }

    function FolderDialog() {
        return (
            <div className="flex w-1/4 h-1/4  absolute rounded-2xl text-xl left-150 bg-white-100 border border-zinc-950 bg-white ">
                <div>
                    <div className="pt-3 pl-5">
                        <label>New Folder</label>
                    </div>
                    <div className="p-6">
                        <input type="text" autoFocus value={Fname} placeholder="Untitled folder"
                            onChange={(e) => setFname(e.target.value)}
                            className="border w-80 p-3 rounded-md focus:outline-none focus:border-blue-600 transition" />
                    </div>
                    <div className="flex pl-10">
                        <button onClick={() => setdisplay(0)} className="pl-40 text-blue-600 cursor-pointer ">Cancel</button>
                        <button onClick={CreateFolder} className="pl-7 text-blue-600 cursor-pointer" >Create</button>
                    </div>
                </div>
            </div>
        )
    }

    function FileDialog() {
        return (
            <div className="flex w-1/3 h-1/2  absolute rounded-2xl text-xl left-150 bg-white-100 border border-zinc-950 bg-white ">
                <div>
                    <div className="pt-3 pl-5">
                        <label className="cursor-pointer">Add File</label>
                    </div>
                    <div className="p-6">
                        <input type="file" 
                        onChange={(e)=>{
                            const inputfile = e.target.files?.[0];
                            if (inputfile) setfile(inputfile);
                         }} 
                        className="border w-110 p-3 rounded-md focus:outline-none focus:border-blue-600 transition cursor-pointer" />
                        <p>
                            {file && (

                                <div className="m-4">{file.name}</div>
                            )}
                        </p>
                    </div>
                    <div className="flex pl-10">
                        <button onClick={() => setfdialog(0)} className="pl-40 text-blue-600 cursor-pointer">Cancel</button>
                        <button onClick={addfile} className="pl-7 text-blue-600 cursor-pointer" >Upload</button>
                    </div>
                </div>
            </div>
        )
    }

    async function addfile() {
        if (file == null){
            alert("Please Upload a File");
            return ;
        }
        console.log(file);
        if (file){
            if (file.size > 10000000){
                setfile(null);
                setfdialog(0);
                alert("image cannot be greator than 10MB");
                return;
            }
            const req1 = await axios.post("http://localhost:3030/getpresignedurl" , {
                'ContentT' : file.type
            },{
                headers : {
                    'Authorization' : localStorage.getItem("token")
                }
            })
            if (req1){
                const req2 = await axios.put(req1.data.putUrl , file);
                console.log(req2);
            }
            console.log(req1);

        }
    }

    return (
        <>
            <div className="w-full min-h-screen">
                <div id="navbar" className="h-20 bg-amber-500">
                    NavBar
                </div>

                <div id="body" className="flex gap-2 min-h-screen w-full" >
                    <div id="sidebar" className="w-40 bg-green-700">
                        Sidebar
                    </div>

                    <div className="w-full">
                        <div>
                            <div>
                                <button onClick={() => { setfdialog(1) }} className="border-black p-5 m-10 bg-amber-400 rounded-2xl cursor-pointer"> Add File </button>
                                <button onClick={() => { setdisplay(1) }} className="border-black p-5 m-10 bg-amber-400 rounded cursor-pointer"> Add Folder</button>
                                {folderdialog ? <FolderDialog /> : null}
                                {filedialog ? <FileDialog /> : null}
                            </div>
                        </div>
                        <div className="w-50 ">
                            <h1 onClick={() => { window.location.href = "/drive" }} className="text-5xl text-blue-500 cursor-pointer">
                                <u>My Drive </u></h1>
                        </div>
                        <br />
                        <hr></hr>
                        <br />
                        <div className="grid grid-cols-4 gap-5 p-5  ">

                            {/* {farr.length == 0 ? <h1>Loading....</h1> :  */}
                            {farr.map((folder) => (
                                <Folder title={folder.title} ParentFolderId={folder.ParentFolderId} id={folder.id} />
                            ))}
                            {/* } */}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}




export default Home
