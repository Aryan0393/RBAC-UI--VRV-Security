const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Inactive" },
  ];
  
  export const getUsers = () => Promise.resolve(users);
  
  export const deleteUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index > -1) users.splice(index, 1);
    return Promise.resolve(true);
  };
  