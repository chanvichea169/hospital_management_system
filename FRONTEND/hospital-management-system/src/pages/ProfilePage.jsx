import React, { useState, useEffect } from "react";
import {
  TextInput,
  Button,
  Avatar,
  Paper,
  Title,
  Text,
  Group,
  Notification,
} from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { getUserById, updateUserProfile } from "../api/userApi";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [initials, setInitials] = useState("");
  const [notification, setNotification] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      getUserById(userId)
        .then((data) => {
          setUser(data);
          if (data.firstName && data.lastName) {
            setInitials(data.firstName.charAt(0) + data.lastName.charAt(0));
          }
        })
        .catch(console.error);
    }
  }, [userId]);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUserProfile(userId, user);
      setUser(updatedUser);
      setNotification({
        color: "teal",
        title: "Success",
        message: "Profile updated successfully!",
        icon: <IconCheck size={18} />,
      });
    } catch (error) {
      setNotification({
        color: "red",
        title: "Error",
        message: "Failed to update profile.",
        icon: <IconX size={18} />,
      });
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <Group>
        <Avatar
          src={user.avatar || `${process.env.PUBLIC_URL}/avatar.png`}
          size={120}
          radius={120}
        >
          {initials}
        </Avatar>
        <div>
          <Title order={2}>
            {user.firstName} {user.lastName}
          </Title>
          <Text c="dimmed">{user.email}</Text>
        </div>
      </Group>

      <form onSubmit={handleSubmit}>
        <TextInput
          label="First Name"
          name="firstName"
          value={user.firstName}
          onChange={handleInputChange}
          required
          mt="md"
        />
        <TextInput
          label="Last Name"
          name="lastName"
          value={user.lastName}
          onChange={handleInputChange}
          required
          mt="md"
        />
        <TextInput
          label="Email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleInputChange}
          required
          mt="md"
        />
        <Button type="submit" mt="xl">
          Update Profile
        </Button>
      </form>

      {notification && (
        <Notification
          icon={notification.icon}
          color={notification.color}
          title={notification.title}
          onClose={() => setNotification(null)}
          mt="md"
        >
          {notification.message}
        </Notification>
      )}
    </Paper>
  );
};

export default ProfilePage;
