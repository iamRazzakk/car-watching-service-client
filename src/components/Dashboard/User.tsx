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
} from "antd";
import { UploadOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authslice";
import {
  useChangePasswordMutation,
  useUploadProfilePictureMutation,
} from "../../redux/Api/AuthApi/authApi";
import { toast } from "sonner";

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

  // Profile picture upload mutation from RTK query
  const [uploadProfilePicture] = useUploadProfilePictureMutation();

  const showPasswordModal = () => {
    form.resetFields();
    setIsEditing(true);
  };

  const handleSavePassword = async (values: PasswordFormValues) => {
    try {
      await changePassword({
        email: user?.email || "",
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      }).unwrap();

      toast.success("Password changed successfully");
      form.resetFields();
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to change password. Please try again.");
    }
  };

  const handleUploadChange = async (info: any) => {
    if (info.file.status === "done") {
      // File uploaded successfully
      toast.success(`${info.file.name} uploaded successfully`);
    } else if (info.file.status === "error") {
      // File upload failed
      toast.error(`${info.file.name} upload failed.`);
    }
  };
  const handleProfilePictureChange = async (file: any) => {
    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      await uploadProfilePicture(formData).unwrap();
      toast.success("Profile picture uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload profile picture. Please try again.");
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
              name="avatar" // This should match the name expected by the backend
              showUploadList={false}
              action="http://localhost:5000/api/auth/upload-avatar" 
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

          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: "Please input your new password!" },
              {
                min: 8,
                message: "Password must be at least 8 characters long",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

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
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

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
