import React, { useState, useEffect } from 'react';
import RoleTable from '../components/Roletable';
import { getRoles, deleteRole } from '../api/roles';

const Roles = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getRoles().then(setRoles);
  }, []);

  const handleDelete = (id) => {
    deleteRole(id).then(() => setRoles(roles.filter(role => role.id !== id)));
  };

  const handleEdit = (role) => {
    alert(`Editing role: ${role.name}`);
  };

  return (
    <div>
      <h2>Role Management</h2>
      <RoleTable roles={roles} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Roles;
