import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RoleManagement.css';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/roles');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const addRole = async () => {
    if (!newRole) {
      alert('Please enter a role name.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/roles', { name: newRole });
      // Use a functional update to make sure the state reflects the most recent value
      setRoles(prevRoles => [...prevRoles, response.data]);
      setNewRole('');
    } catch (error) {
      console.error('Error adding role:', error);
    }
  };

  const deleteRole = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/roles/${id}`);
      setRoles(prevRoles => prevRoles.filter(role => role.id !== id));
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  return (
    <div className="role-management">
      <h2>Role Management</h2>
      
      <div className="add-role-form">
        <input
          type="text"
          placeholder="Enter Role Name"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
        />
        <button onClick={addRole} className="add-button">Add Role</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.id}</td>
              <td>{role.name}</td>
              <td>
                <button
                  onClick={() => deleteRole(role.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleManagement;
