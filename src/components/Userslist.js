// Importing necessary dependencies
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersList = () => {
  // State to store users fetched from the mock server
  const [users, setUsers] = useState([]);

  // Fetch data when the component mounts
  useEffect(() => {
    // Making a GET request to the mock server
    axios
      .get('http://localhost:5000/users') // Replace with the correct API endpoint
      .then((response) => {
        // Storing the fetched data in the state
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the users:", error);
      });
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {/* Looping through users and displaying them */}
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
