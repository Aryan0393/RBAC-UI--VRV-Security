const permissions = [
    { id: 1, name: "Read", description: "Allows reading access" },
    { id: 2, name: "Write", description: "Allows writing access" },
    { id: 3, name: "Delete", description: "Allows deleting access" },
  ];
  
  export const getPermissions = () => Promise.resolve(permissions);
  
  export const deletePermission = (id) => {
    const index = permissions.findIndex((permission) => permission.id === id);
    if (index > -1) permissions.splice(index, 1);
    return Promise.resolve(true);
  };
  