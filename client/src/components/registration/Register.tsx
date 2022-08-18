import { useState } from "react"
import axios from 'axios';
import Input from '@mui/material/Input';
import { Grid, FormControl, Button } from "@mui/material";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(event: any) {
        event.preventDefault()

        const response = await toast.promise((axios.post("http://localhost:8000/api/register",
            ({ name, email, password }),
        )), {
            pending: 'Logging in...',
            success: 'Success! You can now login.',
            error: 'Error. Try again.',
        }
        )
        console.log(response)
    }

    return (
        <>
            <ToastContainer />
            <form id="form" onSubmit={() => handleSubmit}>
                <FormControl required fullWidth margin="normal">
                    <Input type="text" required placeholder="Enter a name" onChange={(e) => setName(e.target.value)}></Input>

                </FormControl>
                <FormControl required fullWidth margin="normal">
                    <Input type="email" required placeholder="Enter an email" onChange={(e) => setEmail(e.target.value)}></Input>

                </FormControl>
                <FormControl required fullWidth margin="normal">
                    <Input type="password" required placeholder="Enter a password" onChange={(e) => setPassword(e.target.value)} ></Input>

                </FormControl>

                <Button fullWidth onClick={handleSubmit}>Register</Button>


            </form >
        </>
    )
}