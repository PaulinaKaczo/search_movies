import { useState } from "react";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Header from "./Header.jsx";
import { createBrowserRouter } from "react-router-dom";

function LoginOrRegisterForm() {
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div className="login_or_register_box">
      <Header />
      <div className="login_or_register_form">
        {currentForm === "login" ? (
          <Login onFormSwitch={toggleForm} />
        ) : (
          <Register onFormSwitch={toggleForm} />
        )}
      </div>
    </div>
  );
}

export default LoginOrRegisterForm;
