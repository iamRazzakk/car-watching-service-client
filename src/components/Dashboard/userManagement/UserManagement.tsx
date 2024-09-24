import { Table, Select, Space } from 'antd';
import { useState } from 'react';
import { useGetAllUsersQuery, useUserUpdateRoleMutation } from '../../../redux/features/auth/authApi';

const { Option } = Select;

const UserManagement = () => {
  const { data, refetch } = useGetAllUsersQuery(undefined); 
  const [updateUserRole] = useUserUpdateRoleMutation();
  const [selectedRole, setSelectedRole] = useState<{ [key: string]: string }>({});

  // Handle role change for a specific user
  const handleRoleChange = async (userId: string, newRole: string) => {
    setSelectedRole((prev) => ({ ...prev, [userId]: newRole }));
    try {
      await updateUserRole({ userId, role: newRole }).unwrap();
      refetch(); // Refetch user data after role update
    } catch (error) {
      console.error('Failed to update role:', error);
    }
  };

  const allUsers = data?.data || [];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => {
        // Conditionally set class based on the role
        const roleClass =
          role === 'ADMIN'
            ? 'border border-green-600 text-green-600'
            : 'border border-blue-600 text-blue-600';
        return (
          <span className={`px-3 py-1 rounded-lg ${roleClass}`}>{role}</span>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_text: any, record: any) => (
        <Space>
          {/* Conditionally render dropdown based on the current role */}
          <Select
            value={selectedRole[record._id] || record.role}
            style={{ width: 120 }}
            onChange={(newRole) => handleRoleChange(record._id, newRole)}
          >
            {/* Show the opposite role in the dropdown */}
            {record.role === 'USER' ? (
              <Option value="ADMIN">Make Admin</Option>
            ) : (
              <Option value="USER">Make User</Option>
            )}
          </Select>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dataSource={allUsers.map((user: any) => ({ ...user, key: user._id }))}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default UserManagement;
