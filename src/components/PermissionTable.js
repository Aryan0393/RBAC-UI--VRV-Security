import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';

const PermissionTable = ({ permissions, onEdit, onDelete }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Permission Name</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {permissions.map((permission) => (
          <TableRow key={permission.id}>
            <TableCell>{permission.name}</TableCell>
            <TableCell>{permission.description}</TableCell>
            <TableCell>
              <Button onClick={() => onEdit(permission)} color="primary">Edit</Button>
              <Button onClick={() => onDelete(permission.id)} color="secondary">Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PermissionTable;
