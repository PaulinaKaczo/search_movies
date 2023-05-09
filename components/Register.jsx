import React, {useEffect, useState} from "react";
import {Button, TextField} from "@mui/material";
import {Link} from "react-router-dom";

function Register({onFormSwitch}) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');



    const handleRegistrationSubmit = async (e) => {
        e.preventDefault();

        const checkIfUsernameExists = async (username) => {
            try {
                const response = await fetch('http://localhost:3000/users');
                const data = await response.json();
                const existingUser = data.find(user => user.username === username);
                if (existingUser) {
                    return true; // użytkownik już istnieje
                } else {
                    return false; // użytkownik nie istnieje
                }
            } catch (error) {
                console.error(error);
                return true; // w przypadku błędu, zakładamy że użytkownik już istnieje
            }
        };

        // Walidacja username
        if (registerUsers.username === username) {
            setErrorMessage('Username is already exist!');

            return;
        }

        // useEffect(() => {
        //     checkIfUsernameExist().then((data) => setErrorMessage())
        // },[username]);

        if (username.length < 6) {
            setErrorMessage('Username must contain at least 6 characters.');
            return;
        }

        // Walidacja email
        if (!email.includes('@') && !email.includes('.')) {
            setErrorMessage('Please provide a valid email address.');
            return;
        }

        // Walidacja hasła
        if (password !== repeatPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        if (!password.length) {
            setErrorMessage('Password is empty.');
            return;
        }

        if (password.length < 6) {
            setErrorMessage('Password is too short.');
            return;
        }


        // Wszystkie pola są poprawne, wysyłamy formularz
        setErrorMessage('');
        setIsSubmitting(true);
        // setSuccessMessage('');

        await fetch('http://localhost:3000/registerUsers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, repeatPassword}),
        })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                setIsSubmitting(false);
                setSuccessMessage('Registration successful!');
                window.location.href = "/home";
            })
            .catch(function(error) {
                setIsSubmitting(false);
                setErrorMessage('Registration failed. Please try again later.');
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
                    type="password"
                    id="repeatPassword"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                />
                <br/>

                 <Link to={successMessage ? '/home' : '#'} onClick={handleRegistrationSubmit}>
                  <Button variant="outlined" size="small" type="submit">Sign Up</Button>
                 </Link>


                <p>Have an account? <Button variant="outlined" size="small" type="button" onClick={() => onFormSwitch('login')}>Log in</Button></p>

            {/*/!* Show the success and error messages if they exist *!/*/}
            {successMessage ? (<p>{successMessage}</p>) : (<p>{errorMessage}</p>)}
        </form>
    );
}

export default Register;