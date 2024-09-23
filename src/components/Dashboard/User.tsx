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
import { useChangePasswordMutation } from "../../redux/Api/AuthApi/authApi";

interface PasswordFormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const { Title, Text } = Typography;

const User: React.FC = () => {
  const user = useAppSelector(useCurrentUser);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm<PasswordFormValues>();

  // Password change mutation from RTK query
  const [changePassword] = useChangePasswordMutation();

  // Show modal for editing user details (for password change)
  const showPasswordModal = () => {
    form.resetFields(); // Clear the form before showing the modal
    setIsEditing(true);
  };

  // Handle password change form submission
  const handleSavePassword = async (values: PasswordFormValues) => {
    try {
      // Call the changePassword mutation with the form values
      await changePassword({
        email: user?.email || "", // User's email from the state
        oldPassword: values.oldPassword, // Old password input
        newPassword: values.newPassword, // New password input
      }).unwrap();

      // Success feedback
      message.success("Password changed successfully");
      form.resetFields(); // Reset the form after successful submission
      setIsEditing(false); // Close the modal
    } catch (error) {
      // Error feedback
      message.error("Failed to change password. Please try again.");
    }
  };

  // Handle profile image upload (optional)
  const handleUploadChange = async (info: any) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} upload failed.`);
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <Card
        title={<Title level={2}>User Profile</Title>}
        extra={
          <Button
            icon={<EditOutlined />}
            onClick={showPasswordModal}
            type="primary"
          >
            Change Password
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

      {/* Change Password Modal */}
      <Modal
        title="Change Password"
        visible={isEditing}
        onCancel={() => setIsEditing(false)}
        footer={null}
        width={400}
      >
        <Form form={form} layout="vertical" onFinish={handleSavePassword}>
          {/* Old Password Input */}
          <Form.Item
            label="Old Password"
            name="oldPassword"
            rules={[
              { required: true, message: "Please input your old password!" },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          {/* New Password Input */}
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: "Please input your new password!" },
              { min: 8, message: "Password must be at least 8 characters long" },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          {/* Confirm Password Input */}
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["newPassword"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
              Save Password
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default User;
