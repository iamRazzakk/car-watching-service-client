// src/components/Dashboard/User.tsx
import React, { useState } from 'react';
import { Card, Col, Row, Avatar, Typography, Button, Modal, Form, Input, Upload, message } from 'antd';
import { UploadOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../redux/hooks';
import { useCurrentUser } from '../../redux/features/auth/authslice';
import {  UserFormValues } from '../../types/UserTypes/userTypes';
export type User = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    role: string;
    profilePicture?: string;
    createdAt: string;
    updatedAt: string;
  }
const { Title, Text } = Typography;

const User: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useAppSelector<User>(useCurrentUser as any);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm<UserFormValues>();

  // Show modal for editing user details
  const showEditModal = () => {
    form.setFieldsValue({
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
    });
    setIsEditing(true);
  };

  // Handle form submit
  const handleSave = async (values: any) => {
    try {
      // Add your update user logic here
      message.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      message.error('Failed to update profile');
    }
  };

  // Upload change handler
  const handleUploadChange = (info: any) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Card
        title={<Title level={2}>User Profile</Title>}
        extra={<Button icon={<EditOutlined />} onClick={showEditModal} type="primary">Edit</Button>}
        style={{ width: '100%' }}
      >
        <Row gutter={16} align="middle">
          <Col xs={24} sm={8} md={6} style={{ textAlign: 'center' }}>
            <Avatar
              size={128}
              src={user?.profilePicture || 'https://via.placeholder.com/128'}
              style={{ marginBottom: '16px' }}
            />
            <Upload
              name="profilePicture"
              showUploadList={false}
              action="/upload" // Replace with your upload endpoint
              onChange={handleUploadChange}
            >
              <Button icon={<UploadOutlined />}>Change Picture</Button>
            </Upload>
          </Col>
          <Col xs={24} sm={16} md={18}>
            <Title level={4}>{user?.name}</Title>
            <Text>Email: {user?.email}</Text>
            <br />
            <Text>Phone: {user?.phone}</Text>
            <br />
            <Text>Address: {user?.address}</Text>
            <br />
            <Text>Role: {user?.role}</Text>
          </Col>
        </Row>
      </Card>

      {/* Edit Modal */}
      <Modal
        title="Edit Profile"
        visible={isEditing}
        onCancel={() => setIsEditing(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          initialValues={{
            name: user?.name,
            email: user?.email,
            phone: user?.phone,
            address: user?.address,
          }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input your address!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default User;
