import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RoleManagement.css';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState('');

  // Fetch roles from the server
  useEffect(() => {
    fetchRoles();
  }, []);

  // Function to fetch roles from the backend
  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/roles');
      console.log('Roles fetched:', response.data); // Log roles to verify the data
      setRoles(response.data); // Set roles data in state
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  // Function to add a new role
  const addRole = async () => {
    if (!newRole) {
      alert('Please enter a role name.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/roles', { name: newRole });
      setRoles([...roles, response.data]); // Add the new role to the state
      setNewRole(''); // Clear the input after adding the role
    } catch (error) {
      console.error('Error adding role:', error);
    }
  };

  // Function to delete a role
  const deleteRole = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/roles/${id}`);
      setRoles(roles.filter(role => role.id !== id)); // Remove the deleted role from the state
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  return (
    <div className="role-management">
      <h2>Role Management</h2>

      {/* Form to add a new role */}
      <div className="add-role-form">
        <input
          type="text"
          placeholder="Enter Role Name"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)} // Handle input change
        />
        <button onClick={addRole} className="add-button">Add Role</button>
      </div>

      {/* Table to display roles */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.length === 0 ? (
            <tr>
              <td colSpan="3">No roles available</td> {/* Show message if no roles */}
            </tr>
          ) : (
            roles.map((role) => (
              <tr key={role.id}>
                <td>{role.id}</td>
                <td>{role.name}</td>
                <td>
                  <button
                    onClick={() => deleteRole(role.id)} // Call deleteRole on click
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RoleManagement;
