import React, { useState, useEffect } from 'react';
import UserTable from '../components/UserTable';
import { getUsers, deleteUser } from '../api/users';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const handleDelete = (id) => {
    deleteUser(id).then(() => setUsers(users.filter(user => user.id !== id)));
  };

  const handleEdit = (user) => {
    alert(`Editing user: ${user.name}`);
  };

  return (
    <div>
      <h2>User Management</h2>
      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Users;
