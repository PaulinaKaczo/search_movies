import React, { useState } from "react";
import Header from "./Header.jsx";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log("Logowanie...");
    };

    const handleRegistrationSubmit = (e) => {
        e.preventDefault();
        console.log("Rejestracja...");
    };

    const toggleRegistration = () => {
        setIsRegistering(!isRegistering);
    };

    return (
        <>
        <Header/>
        <form onSubmit={isRegistering ? handleRegistrationSubmit : handleLoginSubmit}>
            {isRegistering ? (
                <div>
                    <input
                        placeholder="Username"
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <br/>
                    <input
                        placeholder="e-mail"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br/>
                    <input
                        placeholder="Password"
                        type="password"
                        id="username"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br/>
                    <input
                        placeholder="Repeat Password"
                        type="text"
                        id="repeatPassword"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                    <br/>

                    <button type="submit">Sign up</button>
                    <p>Have an account? <button type="button" onClick={toggleRegistration}>Log in</button></p>
                </div>
            ) : (
                <div>
                    <input
                        placeholder="Username"
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <br/>
                    <input
                        placeholder="Password"
                        type="password"
                        id="username"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br/>
                    <button type="submit">Log in</button>
                    <p>Don't have an account? <button type="button" onClick={toggleRegistration}>Sign up</button></p>
                </div>
            )}
        </form>
        </>
    );
}

export default LoginForm;