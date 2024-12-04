import React, { useState, useEffect } from 'react';
import PermissionTable from '../components/permissionTable';
import { getPermissions, deletePermission } from '../api/permissions';

const Permissions = () => {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    getPermissions().then(setPermissions);
  }, []);

  const handleDelete = (id) => {
    deletePermission(id).then(() => setPermissions(permissions.filter(permission => permission.id !== id)));
  };

  const handleEdit = (permission) => {
    alert(`Editing permission: ${permission.name}`);
  };

  return (
    <div>
      <h2>Permission Management</h2>
      <PermissionTable permissions={permissions} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Permissions;
