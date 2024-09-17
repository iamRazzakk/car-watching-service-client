import { Table,  Select, Space } from 'antd';
import { useState } from 'react';
import { useGetAllUsersQuery } from '../../../redux/features/auth/authApi';

const { Option } = Select;

const UserManagement = () => {
  const { data, refetch } = useGetAllUsersQuery();
  const [selectedRole, setSelectedRole] = useState({});

  // Handle role change for a specific user
  const handleRoleChange = (userId: string, role: string) => {
    setSelectedRole((prev) => ({ ...prev, [userId]: role }));
  };

  // Handle updating the role
  const handleUpdateRole = async (userId: string) => {
    if (selectedRole[userId]) {
      await updateUserRole({ userId, role: selectedRole[userId] });
      refetch(); // Refetch user data after role update
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
      render: (role: string) => (
        <span className='border border-blue-600 px-3 py-1 rounded-lg'>{role}</span> 
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: any) => (
        <Space>
          {/* Conditionally render dropdown based on the current role */}
          <Select
            defaultValue={record.role === 'ADMIN' ? 'ADMIN' : 'USER'}
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
        dataSource={allUsers.map((user: any) => ({ ...user, key: user._id }))}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default UserManagement;
