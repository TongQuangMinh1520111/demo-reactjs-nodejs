import React from "react";
import AccountModule from "../modules/account.module";

const AuthLayout = () => {

  const logout = async() => {
    let registerUser = await AccountModule.logout({});
    registerUser();
  };
  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default AuthLayout;
