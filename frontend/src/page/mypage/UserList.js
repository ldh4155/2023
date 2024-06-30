import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { api } from "../../api/api";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get(`members`);
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to load users', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>회원 목록</h2>
      {users.length > 0 ? (
        users.map(user => (
          <div key = {user.memberId}>
            <p>-------------------------------</p>
            <Link to={`/user/${user.memberId}`}>
                <p>{user.nickName}</p>
            </Link>
          </div>
        ))
      ) : (
        <p>회원 없음</p>
      )}
    </div>
  );
}

export default UserList;