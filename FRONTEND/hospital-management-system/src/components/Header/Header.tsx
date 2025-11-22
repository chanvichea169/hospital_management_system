import {
  IconBellRinging,
  IconLayoutSidebarLeftCollapseFilled,
  IconLanguage,
  IconSearch,
  IconLogin,
  IconLogin2,
} from "@tabler/icons-react";
import ProfileMenu from "./ProfileMenu";
import { ActionIcon, Button, TextInput } from "@mantine/core";
import { Link } from "lucide-react";

const Header = () => {
  return (
    <div className="bg-white w-full h-20 flex justify-between items-center px-2 shadow-md dark:shadow-lg transition-colors duration-300">
      <div className="flex items-center gap-4">
        <ActionIcon
          variant="light"
          size="xl"
          className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors duration-300"
        >
          <IconLayoutSidebarLeftCollapseFilled size={28} stroke={1.5} />
        </ActionIcon>
      </div>

      {/* Right side */}
      <div className="flex gap-6 items-center">
        {/* Global search */}
        <TextInput
          placeholder="Search here..."
          leftSection={
            <IconSearch
              size={22}
              className="text-gray-500 dark:text-gray-400"
            />
          }
          radius="xl"
          size="lg"
          className="w-80"
          classNames={{
            input:
              "dark:bg-white dark:text-gray-900 dark:placeholder-gray-500 dark:border-gray-300 transition-colors duration-300",
          }}
        />

        {/* Language */}
        <ActionIcon
          variant="light"
          size="xl"
          radius="xl"
          className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors duration-300"
        >
          <IconLanguage size={26} stroke={1.5} />
        </ActionIcon>

        {/* Notifications */}
        <ActionIcon
          variant="light"
          size="xl"
          radius="xl"
          className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors duration-300"
        >
          <IconBellRinging size={26} stroke={1.5} />
        </ActionIcon>
        {/* Profile Menu */}
        <ProfileMenu />
      </div>
    </div>
  );
};

export default Header;
