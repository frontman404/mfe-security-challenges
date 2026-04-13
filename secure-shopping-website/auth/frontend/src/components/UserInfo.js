import React from "react";
import { useAuth } from "../AuthProvider";
import DOMPurify from "dompurify";
import styles from "./userInfo.module.scss";

const UserInfo = () => {
  const { user, handleLogout } = useAuth();
  const sanitizedUserName = DOMPurify.sanitize(user.name);
  const sanitizedUserEmail = DOMPurify.sanitize(user.email);
  return (
    <div className={styles.userInfoContainer}>
      <div className={styles.userInfo}>
        <h2>User Dashboard</h2>
        <p>
          Name: <span dangerouslySetInnerHTML={{ __html: sanitizedUserName }} />
        </p>
        <p>
          Email:{" "}
          <span dangerouslySetInnerHTML={{ __html: sanitizedUserEmail }} />
        </p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default UserInfo;
