import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Navigate, useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import axios from "axios";

interface ISignin{
    email : string,
    password : string
}

export default function SignIn() {
    const navigate = useNavigate();
    const [loginDetails , setloginDetails] = useState<ISignin>({
        email : "",
        password : ""
    })
    async function SigninUser(){
        console.log(loginDetails);
        const response = await axios.post("http://localhost:3001/signin" ,{
            email  :loginDetails.email,
            password : loginDetails.password
        })
        console.log(response);
        if (response.status == 201 ){
            alert("You have signed In successfully");
            let token = response.data.token;
            localStorage.setItem("token" , "Bearer " + token );
            navigate("/drive");
        }
        else{
            alert("wrong credentials");
        }
    }
    return (    
        <div className="flex justify-center h-screen align-middle w-screen">
            <div className="align-middle">
                
                <Card >
                    <CardHeader>
                        <CardTitle>Login to your account</CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account
                        </CardDescription>
                        <CardAction>
                            <Button onClick = {(e)=>{navigate("/signup")}}variant="link">Sign Up</Button>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <form> 
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                        onChange={(e) =>setloginDetails(prev =>({
                                            ...prev , email : e.target.value
                                        }))}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <a
                                            href="#"
                                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                        >
                                            Forgot your password?
                                        </a>
                                    </div>
                                    <Input id="password" type="password" required 
                                    onChange={(e)=>setloginDetails((prev)=>({
                                        ...prev , password : e.target.value 
                                    }))}/>
                                </div>
                            </div>
                        </form>

                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button onClick={(e)=>SigninUser()} className="w-full">
                            Login
                        </Button>
                        {/* <Button variant="outline" className="w-full">
                            Login with Google
                        </Button> */}
                    </CardFooter>
                </Card>
            </div>  
        </div>
    )
}
