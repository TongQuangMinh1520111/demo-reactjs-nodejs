import React, { createRef, useState } from "react";
import AccountModule from "../modules/account.module";

const Login = () => {
  const [inputField, setInputField] = useState({});

  const { emailRef, passwRef } = createRef();

  const handleChange = (event) => {
    setInputField({
      ...inputField,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userLogin = await AccountModule.login(inputField);
    if (userLogin.success) {
      window.location.href = "/home";
    } else {
      alert(userLogin.errMsg);
    }
  };

  return (
    <div id="login">
      <div className="inner">
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>

          <label>Username</label>
          <input
            ref={emailRef}
            name="email"
            placeholder="Username"
            value={inputField.email}
            onChange={handleChange}
          />
          <br />

          <label>Password</label>
          <input
            ref={passwRef}
            type="password"
            name="password"
            placeholder="Password"
            value={inputField.password}
            onChange={handleChange}
          />
          <br />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Login;
