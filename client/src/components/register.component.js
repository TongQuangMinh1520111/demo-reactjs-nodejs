import React, { useState } from "react";
import AccountModule from "../modules/account.module";

const Register = (props) => {
  const [inputField, setInputField] = useState({
    username: "",
    password: "",
    email: "",
    bio: "",
  });

  const handleChange = (event) => {
    setInputField({
      ...inputField,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let registerUser = await AccountModule.register(inputField);
    if (registerUser.success) {
      let userLogin = await AccountModule.login(inputField);
      if (userLogin.success) {
        window.location.href = "/auth";
      } else {
        alert(userLogin.errMsg);
      }
    } else {
      // show error
    }
  };

  return (
    <div id="register">
      <div className="inner">
        <h3 className="h3title">Sign Up For An Account</h3>
        <div className="register_form">
          <form onSubmit={handleSubmit}>
            <ul className="c_form">
              <li>
                <label>Username</label>
                <input
                  className="input_cus"
                  name="username"
                  placeholder="Username"
                  required
                  value={inputField.username}
                  onChange={handleChange}
                />
              </li>
              <li>
                <label>Password</label>
                <input
                  className="input_cus"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={inputField.password}
                  onChange={handleChange}
                />
              </li>
              <li>
                <label>Email</label>
                <input
                  className="input_cus"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={inputField.email}
                  onChange={handleChange}
                />
              </li>
              <li className="box_textarea">
                <label>Bio</label>
                <textarea
                  className="textarea_cus"
                  name="bio"
                  placeholder="Bio"
                  required
                  value={inputField.bio}
                  onChange={handleChange}
                />
              </li>
              <li className="box_submit">
                <input className="btn_submit" type="submit" />
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
