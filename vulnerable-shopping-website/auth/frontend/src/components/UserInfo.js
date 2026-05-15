import React from "react";
import { useAuth } from "../AuthProvider";
import "./UserInfo.scss";

const UserInfo = () => {
  const { user, handleLogout } = useAuth();
  return (
    <div className="user-info-container">
      <div className="user-info">
        <h2>User Dashboard</h2>
        <p>
          Name: <span dangerouslySetInnerHTML={{ __html: user.name }} />
        </p>
        <p>
          Email: <span dangerouslySetInnerHTML={{ __html: user.email }} />
        </p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default UserInfo;
