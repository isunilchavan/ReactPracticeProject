import React from "react";
import "./UserList.css";

function UserList({ users }) {
  return (
    <div className="user-list">
      <h2>User List</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <div className="user-info">Username: {user.username}</div>
            <div className="user-age">Age: {user.age}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
