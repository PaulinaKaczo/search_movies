import React, { useState } from "react";
import {Button, TextField} from "@mui/material";
import {Link} from "react-router-dom";

function Login({onFormSwitch}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // await fetch('http://localhost:3000/registerUsers', {
        //     method: 'POST',
        //     headers: { 'Accept': 'application/json' },
        //     body: JSON.stringify({ username, password),
        // })
        //     .then(function(response) {
        //         return response.json();
        //     })
        //     .catch(function(error) {
        //         console.log(error);
        //     });
    };



    return (
        <>
        <form onSubmit={handleSubmit}>
            <TextField id="filled-basic" label="Username" variant="filled"
                        placeholder="Username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

            <TextField id="filled-basic" label="Password" variant="filled"
                        placeholder="********"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        variant="outlined"
                        size="small"
                        type="submit"

                    >
                        {(isRegistering) ? ("Nieprawidłowy Login lub Hasło") : (<Link to={`/home`}> Log in</Link>)}
                    </Button>
                    <p>Don't have an account? <Button variant="outlined" size="small" type="button" onClick={() => onFormSwitch('register')}>Sign up</Button></p>
        </form>
        </>
    );
}

export default Login;