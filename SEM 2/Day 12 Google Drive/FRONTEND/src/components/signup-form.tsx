import axios from "axios";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { useState } from "react";



interface form {
    name: string,
    email: string,
    password: string,
    confirmpassword: string
}

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
    const [formdetails, setformdetails] = useState<form>({
        name: "",
        email: "",
        password: "",
        confirmpassword: ""
    })
    const navigate = useNavigate();

    async function SignupUser() {
        const response = await axios.post("http://localhost:3001/signup", {
            email: formdetails.email,
            password: formdetails.password
        })
        if (response.status ==201){
            alert("User Created Successfully");
            navigate("/signin");
        }
        console.log(response);
    }

    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                    Enter your information below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    SignupUser();
                }}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="name">Full Name</FieldLabel>
                            <Input id="name" type="text" placeholder="John Doe" onChange={(e) => setformdetails(prev => ({
                                ...prev, name: e.target.value
                            }))} required />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                onChange={(e) => setformdetails(prev => ({
                                    ...prev, email: e.target.value
                                }))}
                            />
                            <FieldDescription>
                                We&apos;ll use this to contact you. We will not share your email
                                with anyone else.
                            </FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input id="password" type="password" required onChange={(e) => setformdetails(prev => ({
                                ...prev, password: e.target.value
                            }))} />
                            <FieldDescription>
                                Must be at least 8 characters long.
                            </FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="confirm-password">
                                Confirm Password
                            </FieldLabel>
                            <Input id="confirm-password" type="password" required onChange={(e) => setformdetails(prev => ({
                                ...prev, confirmpassword: e.target.value
                            }))} />
                            <FieldDescription>Please confirm your password.</FieldDescription>
                        </Field>
                        <FieldGroup>
                            <Field>
                                <Button type = "submit" >Create Account</Button>
                                {/* <Button variant="outline" type="button">
                  Sign up with Google
                </Button> */}
                                <FieldDescription className="px-6 text-center">
                                    Already have an account? <button onClick={() => navigate('/signin')}>Sign in</button>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}
