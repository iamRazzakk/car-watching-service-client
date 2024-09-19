import React, { useState } from "react";
import {
  Card,
  Col,
  Row,
  Avatar,
  Typography,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  message,
} from "antd";
import { UploadOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authslice";
import {
  useChangePasswordMutation,
  useUploadProfilePictureMutation,
} from "../../redux/Api/AuthApi/authApi";

const { Title, Text } = Typography;

const User: React.FC = () => {
  const user = useAppSelector(useCurrentUser);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  // Upload mutation
  const [uploadProfilePicture] = useUploadProfilePictureMutation();
  const [changePassword] = useChangePasswordMutation();

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
      // Handle password change if applicable
      if (values.password) {
        await changePassword({ oldPassword: "", newPassword: values.password }); // Replace '' with old password
      }

      // Handle user profile update
      await uploadProfilePicture(new FormData(document.querySelector("form"))); // Adjust as needed

      message.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      message.error("Failed to update profile");
    }
  };

  // Upload change handler
  const handleUploadChange = async (info: any) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <Card
        title={<Title level={2}>User Profile</Title>}
        extra={
          <Button
            icon={<EditOutlined />}
            onClick={showEditModal}
            type="primary"
          >
            Edit
          </Button>
        }
        style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}
      >
        <Row gutter={16}>
          <Col span={8} style={{ textAlign: "center" }}>
            <Avatar
              size={128}
              src={user?.profilePicture || "https://via.placeholder.com/128"}
              style={{ marginBottom: "16px" }}
            />
            <Upload
              name="profilePicture"
              showUploadList={false}
              action="http://localhost:5000/api/auth/users/profile"
              onChange={handleUploadChange}
              // headers={{ Authorization: `Bearer ${yourAuthToken}` }}
            >
              <Button icon={<UploadOutlined />}>Change Picture</Button>
            </Upload>
          </Col>
          <Col span={16}>
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
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label="New Password" name="password">
            <Input.Password />
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
