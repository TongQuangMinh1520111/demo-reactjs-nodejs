import React, { useEffect, useState } from "react";
import AccountModule from "../../modules/account.module";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const logout = async () => {
    let registerUser = await AccountModule.logout({});
    registerUser();
  };
  useEffect(() => {
    const data = AccountModule.getProfile();
    data.then(function (result) {
      setProfile(result.data.profile);
    });
  }, []);

  return (
    <div id="profile">
      <div className="inner">
        <ul>
          <li>{profile.email}</li>
          <li>{profile.username}</li>
        </ul>
        <div>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
