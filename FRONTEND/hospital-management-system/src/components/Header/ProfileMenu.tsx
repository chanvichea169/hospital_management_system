import { useEffect, useState } from "react";
import { Menu, Text, Avatar, Divider } from "@mantine/core";
import {
  IconSettings,
  IconMessageCircle,
  IconLogout,
  IconUser,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../api/userApi";

interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  avatar?: string;
  role?: string;
}

const ProfileMenu = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  const userId = localStorage.getItem("userId");
  const API_BASE = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const loadUser = async () => {
      if (!userId) return;
      try {
        const data = await getUserById(userId);
        setUser(data);
      } catch (err) {
        console.error("Failed to load user:", err);
      }
    };
    loadUser();
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login", { replace: true });
  };

  const getInitials = () => {
    if (!user) return "U";
    if (user.firstName && user.lastName)
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    if (user.firstName) return user.firstName[0].toUpperCase();
    if (user.username) return user.username[0].toUpperCase();
    return "U";
  };
  // Construct full avatar URL from backend
  const avatarSrc = user?.avatar
    ? `${API_BASE}/upload/users/${user.avatar}`
    : undefined;

  return (
    <Menu shadow="md" width={220} position="bottom-end">
      <Menu.Target>
        <div className="flex items-center gap-3 cursor-pointer">
          <Avatar
            src={avatarSrc}
            size={46}
            radius="xl"
            color="cyan"
            alt={user?.username}
          >
            {!avatarSrc && getInitials()}
          </Avatar>
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <div className="flex items-center gap-3 p-3">
          <Avatar
            src={avatarSrc}
            size={40}
            radius="xl"
            color="blue"
            alt={user?.username}
          >
            {!avatarSrc && getInitials()}
          </Avatar>

          <div>
            <Text fw={500} className="font-semibold capitalize cyan-600">
              {user
                ? user.firstName
                  ? `${user.firstName} ${user.lastName}`
                  : user.username
                : "User"}
            </Text>
            <Text size="xs" c="dimmed">
              {user?.role || ""}
            </Text>
          </div>
        </div>

        <Divider />

        <Menu.Label>Application</Menu.Label>
        <Menu.Item
          leftSection={<IconUser size={16} />}
          onClick={() => navigate("/profile")}
        >
          Profile
        </Menu.Item>

        <Menu.Item leftSection={<IconSettings size={16} />}>Settings</Menu.Item>
        <Menu.Item leftSection={<IconMessageCircle size={16} />}>
          Messages
        </Menu.Item>

        <Menu.Divider />

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
