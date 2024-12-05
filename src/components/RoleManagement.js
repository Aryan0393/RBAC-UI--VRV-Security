import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap import for styling

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  // Fetch users data
  useEffect(() => {
    axios
      .get("http://localhost:5000/users") // Ensure this endpoint is correct
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log("Error fetching users:", error);
      });
  }, []);

  // Delete user function
  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:5000/users/${id}`)
      .then((response) => {
        // Remove deleted user from the state
        setUsers(users.filter(user => user.id !== id));
      })
      .catch((error) => {
        console.log("Error deleting user:", error);
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">User Management</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th> {/* Added actions column */}
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm mx-2"
                    onClick={() => alert("Edit feature is not implemented yet")}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
