import express, { type Request, type Response , type Express}  from "express";
import { S3Client, GetObjectCommand , PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import "dotenv/config"
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
const R2_ACCESS_KEY_ID =  process.env.R2_ACCESS_KEY_ID
const R2_URL = process.env.R2_URL;
const R2_ACCESS_SECRET = process.env.R2_ACCESS_SECRET;

const app = express();

const S3 = new S3Client({
    region : "auto" ,
    endpoint : R2_URL! ,
    
    credentials : {
        accessKeyId : R2_ACCESS_KEY_ID!,
        secretAccessKey : R2_ACCESS_SECRET!
    }
})

app.get("/all" , async(req : Request , res : Response)=>{
    const command = new ListObjectsV2Command({
      Bucket: "youtube-100xdevs",
    });
    
    const response = await S3.send(command);
    console.log(response.Contents);
    return res.json({
        res : response.Contents
    })
})

app.post("/getpresignedurl" , async(req : Request , res : Response) =>{
    const videoPath  = "akshat/"  + Math.random() + ".jpg";
    try{
        const putUrl = await getSignedUrl(
            S3,
            new PutObjectCommand({
                Bucket : "youtube-100xdevs",
                Key : videoPath,
                ContentType : "image/jpg"
            })
            , {expiresIn : 3600}
        )
        return res.json({
            putUrl : putUrl ,
            finalVideoUrl : "https://pub-9ed79a211b484b3f819c6f0883e7ac3e.r2.dev/" + videoPath  
        })
    }catch(e){
        console.log(e);
        return res.json({
            msg : e
        })
    }    
})

app.get("/debug/raw/", async (req : Request, res : Response) => {
    // let key = req.params.key; // everything after /debug/raw/  
    let key = "akshat/0.3579003226722629.jpg";
    const result = await S3.send(
      new GetObjectCommand({
        Bucket: "youtube-100xdevs",
        Key: key!,
      })
    );
  
    res.status(200).json({
      ContentType: result.ContentType,
      ContentLength: result.ContentLength,
    });
});

app.listen(3030);