import { useEffect, useState } from "react";
import {Post, type Ipost } from "./Post.tsx"
import axios from "axios";

interface IFeed{
    id: number,
    user_id: number,
    CreatedAt: string,
    content:  string,
    contentimg:  string,
    contentvdo?:  string,
    owner: { id: number,
        name: string,
        email:  string,
        password:  string,
        secretrole:  string,
        subheading? :  string,
        phone? :  string,
        coverpic? : string,
        ppic?  :string,
        Location? :  string,
        About? :  string
    }
}

async function fetchPostData(){
    const postsdata = await axios.get("http://localhost:3001/posts");
    return postsdata;
}


export function Feed(){
    const [postarr , setpostarr] = useState<IFeed[] | []>([]);
    useEffect(() =>{
        let f = async ()=>{
            let postsdata = await fetchPostData();
            // console.log(postsdata.data.posts)
            setpostarr(postsdata.data.posts);
        }
        f();
    }, []);
    console.log(postarr);
    return (
        <div>
            {(postarr.length !=0) ?  
            postarr.map((post : any)=>(
                <Post 
                pp = {post.owner.ppic }
                pname = {post.owner.name}
                desc = {post.owner.subheading}
                CreatedAt = {post.owner.CreatedAt}    
                content = {post.content}
                contentimg = {post.contentimg}
            />    
            ))
             : "Loading....."  }
            {/* <Post 
                pp = "https://codeforces.com/userpic.codeforces.org/4836433/title/ae02cda3e186345.jpg"
                pname = "Akshat Mittal"
                desc = "Average Enginner "
                CreatedAt = "Week ago"
                content = "Excited to share that I’ve been selected as a 𝗦𝗵𝗲𝗙𝗶 Scholar for 𝗦𝗲𝗮𝘀𝗼𝗻 𝟭𝟲 Over the next 6 weeks, I’ll be diving deep into 𝗰𝗿𝘆𝗽𝘁𝗼, 𝗗𝗲𝗙𝗶, and 𝗔𝗜 to expand my knowledge and take bigger, bolder steps in my career. Grateful to Base, Trezor Wallet, Rootstock Collective, and Decentraland for supporting this journey and a special thank you to 𝗠𝗮𝗴𝗴𝗶𝗲 𝗟𝗼𝘃𝗲 for building such an empowering space for women in Web3.Looking forward to learning, building, and growing alongside this amazing community ✨"
                contentpic = "https://avatars.githubusercontent.com/u/154778752?v=4"
            />
            <Post 
                pp = "https://codeforces.com/userpic.codeforces.org/4836433/title/ae02cda3e186345.jpg"
                pname = "Akshat Mittal"
                desc = "Average Enginner "
                CreatedAt = "Week ago"
                content = "Excited to share that I’ve been selected as a 𝗦𝗵𝗲𝗙𝗶 Scholar for 𝗦𝗲𝗮𝘀𝗼𝗻 𝟭𝟲 Over the next 6 weeks, I’ll be diving deep into 𝗰𝗿𝘆𝗽𝘁𝗼, 𝗗𝗲𝗙𝗶, and 𝗔𝗜 to expand my knowledge and take bigger, bolder steps in my career. Grateful to Base, Trezor Wallet, Rootstock Collective, and Decentraland for supporting this journey and a special thank you to 𝗠𝗮𝗴𝗴𝗶𝗲 𝗟𝗼𝘃𝗲 for building such an empowering space for women in Web3.Looking forward to learning, building, and growing alongside this amazing community ✨"
            />
            <Post 
                pp = "https://codeforces.com/userpic.codeforces.org/4836433/title/ae02cda3e186345.jpg"
                pname = "Akshat Mittal"
                desc = "Average Enginner "
                CreatedAt = "Week ago"
                content = "Excited to share that I’ve been selected as a 𝗦𝗵𝗲𝗙𝗶 Scholar for 𝗦𝗲𝗮𝘀𝗼𝗻 𝟭𝟲 Over the next 6 weeks, I’ll be diving deep into 𝗰𝗿𝘆𝗽𝘁𝗼, 𝗗𝗲𝗙𝗶, and 𝗔𝗜 to expand my knowledge and take bigger, bolder steps in my career. Grateful to Base, Trezor Wallet, Rootstock Collective, and Decentraland for supporting this journey and a special thank you to 𝗠𝗮𝗴𝗴𝗶𝗲 𝗟𝗼𝘃𝗲 for building such an empowering space for women in Web3.Looking forward to learning, building, and growing alongside this amazing community ✨"
            />
            <Post 
                pp = "https://codeforces.com/userpic.codeforces.org/4836433/title/ae02cda3e186345.jpg"
                pname = "Akshat Mittal"
                desc = "Average Enginner "
                CreatedAt = "Week ago"
                content = "Excited to share that I’ve been selected as a 𝗦𝗵𝗲𝗙𝗶 Scholar for 𝗦𝗲𝗮𝘀𝗼𝗻 𝟭𝟲 Over the next 6 weeks, I’ll be diving deep into 𝗰𝗿𝘆𝗽𝘁𝗼, 𝗗𝗲𝗙𝗶, and 𝗔𝗜 to expand my knowledge and take bigger, bolder steps in my career. Grateful to Base, Trezor Wallet, Rootstock Collective, and Decentraland for supporting this journey and a special thank you to 𝗠𝗮𝗴𝗴𝗶𝗲 𝗟𝗼𝘃𝗲 for building such an empowering space for women in Web3.Looking forward to learning, building, and growing alongside this amazing community ✨"
            />
            <Post 
                pp = "https://codeforces.com/userpic.codeforces.org/4836433/title/ae02cda3e186345.jpg"
                pname = "Akshat Mittal"
                desc = "Average Enginner "
                CreatedAt = "Week ago"
                content = "Excited to share that I’ve been selected as a 𝗦𝗵𝗲𝗙𝗶 Scholar for 𝗦𝗲𝗮𝘀𝗼𝗻 𝟭𝟲 Over the next 6 weeks, I’ll be diving deep into 𝗰𝗿𝘆𝗽𝘁𝗼, 𝗗𝗲𝗙𝗶, and 𝗔𝗜 to expand my knowledge and take bigger, bolder steps in my career. Grateful to Base, Trezor Wallet, Rootstock Collective, and Decentraland for supporting this journey and a special thank you to 𝗠𝗮𝗴𝗴𝗶𝗲 𝗟𝗼𝘃𝗲 for building such an empowering space for women in Web3.Looking forward to learning, building, and growing alongside this amazing community ✨"
            /> */}
        </div>

    )
}

export default Feed
