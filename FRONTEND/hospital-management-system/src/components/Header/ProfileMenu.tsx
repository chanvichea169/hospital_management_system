import { Menu, Text, Avatar, Divider } from "@mantine/core";
import {
  IconSettings,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconLogout,
  IconUser,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const ProfileMenu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear JWT token
    localStorage.removeItem("token");
    // Redirect to login page
    navigate("/login", { replace: true });
  };

  return (
    <Menu shadow="md" width={220} position="bottom-end">
      <Menu.Target>
        <div className="flex items-center gap-3 cursor-pointer">
          <span className="font-medium text-lg text-neutral-900">Admin</span>
          <Avatar src="avatar.png" size={36} alt="Admin" radius="xl" />
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <div className="flex items-center gap-3 p-3">
          <Avatar src="avatar.png" size={40} radius="xl" />
          <div>
            <Text fw={500}>Admin</Text>
            <Text size="xs" c="dimmed">
              Administrator
            </Text>
          </div>
        </div>
        <Divider />

        <Menu.Label>Application</Menu.Label>
        <Menu.Item leftSection={<IconUser size={16} />}>Profile</Menu.Item>
        <Menu.Item leftSection={<IconSettings size={16} />}>Settings</Menu.Item>
        <Menu.Item leftSection={<IconMessageCircle size={16} />}>
          Messages
        </Menu.Item>

        <Menu.Divider />

        <Menu.Divider />

        {/* Proper Logout */}
        <Menu.Item
          color="red"
          leftSection={<IconLogout size={16} />}
          onClick={handleLogout}
          className="font-semibold"
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
