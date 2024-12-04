const roles = [
    { id: 1, name: "Admin", description: "Has full access", permissions: ["Read", "Write", "Delete"] },
    { id: 2, name: "Editor", description: "Can edit content", permissions: ["Read", "Write"] },
  ];
  
  export const getRoles = () => Promise.resolve(roles);
  
  export const deleteRole = (id) => {
    const index = roles.findIndex((role) => role.id === id);
    if (index > -1) roles.splice(index, 1);
    return Promise.resolve(true);
  };
  