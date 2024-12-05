import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState('');
  const [newUser, setNewUser] = useState({ name: '', role: '' });

  // Fetch users and roles from the mock server
  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/roles');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  // Add a new user
  const addUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/users', newUser);
      setUsers([...users, response.data]);
      setNewUser({ name: '', role: '' });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  // Add a new role
  const addRole = async () => {
    if (!newRole) {
      alert('Please enter a role name');
      return;
    }

    try {
      console.log('Adding role:', newRole); // Debugging line
      const response = await axios.post('http://localhost:5000/roles', { name: newRole });
      
      console.log('Role added:', response.data); // Check if role was added

      // Update the roles state with the new role
      setRoles([...roles, response.data]);

      // Clear the input field after adding the role
      setNewRole('');
    } catch (error) {
      console.error('Error adding role:', error);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="App">
      <h1>User Management</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm mx-2"
                  type="button"
                  onClick={() => alert("Edit feature is not implemented yet")}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  type="button"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add User</h2>
      <input
        type="text"
        placeholder="User Name"
        value={newUser.name}
        onChange={e => setNewUser({ ...newUser, name: e.target.value })}
      />
      <select
        value={newUser.role}
        onChange={e => setNewUser({ ...newUser, role: e.target.value })}
      >
        <option value="">Select Role</option>
        {roles.map(role => (
          <option key={role.id} value={role.name}>
            {role.name}
          </option>
        ))}
      </select>
      <button onClick={addUser}>Add User</button>

      <h1>Role Management</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Role Name</th>
          </tr>
        </thead>
        <tbody>
          {roles.map(role => (
            <tr key={role.id}>
              <td>{role.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add Role</h2>
      <input
        type="text"
        placeholder="Role Name"
        value={newRole}
        onChange={e => setNewRole(e.target.value)}
      />
      <button onClick={addRole}>Add Role</button>
    </div>
  );
}

export default App;
