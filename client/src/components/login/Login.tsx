import { useState } from "react"
import axios from '../../api/axios';
import Input from '@mui/material/Input';
import { Grid, FormControl, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from "react-router-dom";




export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState(false)
    const [render, setRender] = useState(false)

    function moreRenders(){
        setRender(!render)
    }

    async function handleSubmit(event: any) {
        event.preventDefault()
        const response = await toast.promise(axios.post("/login",
            JSON.stringify({ email, password }),
        ), {
            pending: 'Logging in...',
            success: 'Success!',
            error: 'Error. Try again.',
        })
        
        console.log(response)
        localStorage.setItem("user", JSON.stringify(response.data.user))
        setSuccess(prevState => !prevState)
        window.location.reload();
    }


    return (
        <>
        {localStorage.getItem("user") && <Navigate to="/"/>}
            <form onSubmit={handleSubmit}>
                <FormControl required fullWidth margin="normal">
                    <Input type="email" placeholder="Enter an email" onChange={(e) => setEmail(e.target.value)}></Input>
                </FormControl>
                <FormControl required fullWidth margin="normal">
                    <Input type="password" placeholder="Enter a password" onChange={(e) => setPassword(e.target.value)} ></Input>
                </FormControl>

                <Button fullWidth onClick={handleSubmit}>Login</Button>
            </form >
            <ToastContainer  />
            {success && <Navigate replace to="/" />}
        </>
    )
}