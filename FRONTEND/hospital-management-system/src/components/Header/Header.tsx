import {
  IconBellRinging,
  IconLayoutSidebarLeftCollapseFilled,
  IconLanguage,
  IconSearch,
  IconLogin,
  IconLogin2,
} from "@tabler/icons-react";
import ProfileMenu from "./ProfileMenu";
import { ActionIcon, TextInput } from "@mantine/core";

const Header = () => {
  return (
    <div className="bg-white w-full h-20 flex justify-between items-center px-2 shadow-md">
      <div className="flex items-center gap-4">
        <ActionIcon
          variant="light"
          size="xl"
          className="text-gray-700 hover:bg-gray-200 rounded-full"
        >
          <IconLayoutSidebarLeftCollapseFilled size={28} stroke={1.5} />
        </ActionIcon>
      </div>

      {/* Right side */}
      <div className="flex gap-6 items-center">
        {/* Global search */}
        <TextInput
          placeholder="Search here..."
          leftSection={<IconSearch size={22} />}
          radius="xl"
          size="lg"
          className="w-80"
        />

        {/* Language */}
        <ActionIcon
          variant="light"
          size="xl"
          className="text-gray-700 hover:bg-gray-200 rounded-full"
        >
          <IconLanguage size={26} stroke={1.5} />
        </ActionIcon>

        {/* Notifications */}
        <ActionIcon
          variant="light"
          size="xl"
          className="text-gray-700 hover:bg-gray-200 rounded-full"
        >
          <IconBellRinging size={26} stroke={1.5} />
        </ActionIcon>

        {/* Login button
        <Button
          component={Link}
          to="/login"
          variant="gradient"
          leftSection={<IconLogin2 size={22} />}
          radius="md"
          size="md"
          className="font-semibold shadow-md"
        >
          Login
        </Button> */}

        {/* Profile Menu */}
        <ProfileMenu />
      </div>
    </div>
  );
};

export default Header;
