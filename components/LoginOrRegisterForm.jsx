import {useState} from "react";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Header from "./Header.jsx";
import {createBrowserRouter} from "react-router-dom";


function LoginOrRegisterForm() {
    const [currentForm, setCurrentForm] = useState('login');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }

    return (
        <>
        <Header/>
        <div className="LoginOrRegisterForm">
            {
            currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>
            }
        </div>
        </>
    );
}

export default LoginOrRegisterForm;