import React, {useState} from "react";
import {Button, TextField} from "@mui/material";

function Register({onFormSwitch}) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState('');



    const handleRegistrationSubmit = async (e) => {
        e.preventDefault();

        await fetch('http://localhost:3000/registerUsers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, repeatPassword}),
        })
            .then(function(response) {
                return response.json();
            })
            .catch(function(error) {
                console.log(error);
            });
    };


    return (
        <form onSubmit={handleRegistrationSubmit}>
            <TextField label="Username" variant="filled"
                    placeholder="Username"
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            <TextField label="E-mail" variant="filled"
                    placeholder="youremail@gmail.com"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            <TextField label="Password" variant="filled"
                    placeholder="********"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            <TextField label="Repeat Password" variant="filled"
                    placeholder="********"
                    type="text"
                    id="repeatPassword"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                />
                <br/>

                <a href="">
                    <Button variant="outlined" size="small" type="submit">Sign up</Button>
                </a>
                <p>Have an account? <Button variant="outlined" size="small" type="button" onClick={() => onFormSwitch('login')}>Log in</Button></p>
        </form>
    );
}

export default Register;