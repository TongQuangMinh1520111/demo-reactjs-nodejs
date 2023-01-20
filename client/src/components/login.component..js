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
        <h3 className="h3title">Sign In</h3>
        <div className="login_form">
          <form onSubmit={handleSubmit}>
            <ul className="c_form">
              <li>
                <label>Username</label>
                <input
                  className="input_cus"
                  ref={emailRef}
                  name="email"
                  placeholder="Email / Username"
                  value={inputField.email}
                  onChange={handleChange}
                />
              </li>
              <li>
                <label>Password</label>
                <input
                  className="input_cus"
                  ref={passwRef}
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={inputField.password}
                  onChange={handleChange}
                />
              </li>
              <li className="box_submit">
                <input className="btn_submit" type="submit" value="Login" />
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
