import { useState, useEffect } from "react";
import {
  ActionIcon,
  Drawer,
  Switch,
  useMantineColorScheme,
  Text,
  SimpleGrid,
  Group,
  Slider,
  Select,
  ColorInput,
  Tooltip,
  Divider,
  Stack,
  Box,
} from "@mantine/core";
import {
  IconSettings,
  IconSun,
  IconMoonStars,
  IconPalette,
} from "@tabler/icons-react";

const SETTINGS_KEY = "app-settings";

type Settings = {
  animations: boolean;
  customSidebar: boolean;
  extraPanels: boolean;
  emailAlerts: boolean;
  pushNotifications: boolean;
  themeColor: string;
  fontSize: number;
  language: string;
};

type SettingItemProps = {
  label?: string;
  icon?: React.ReactNode;
  checked?: boolean;
  onToggle?: () => void;
  customComponent?: React.ReactNode;
};

function SettingItem({
  label,
  icon,
  checked,
  onToggle,
  customComponent,
}: SettingItemProps) {
  return (
    <Box
      p="md"
      className="rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 transition-all"
    >
      <Group justify="space-between" align="center">
        <Group gap="xs">
          {icon}
          {label && <Text>{label}</Text>}
        </Group>
        {customComponent ||
          (checked !== undefined && onToggle && (
            <Switch checked={checked} onChange={onToggle} color="ocean-blue" />
          ))}
      </Group>
    </Box>
  );
}

export default function SettingsButton() {
  const [opened, setOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [settings, setSettings] = useState<Settings>({
    animations: true,
    customSidebar: true,
    extraPanels: true,
    emailAlerts: true,
    pushNotifications: false,
    themeColor: "#7AD1DD",
    fontSize: 14,
    language: "en",
  });

  useEffect(() => {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  const handleToggle = (key: keyof Settings) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleChange = (key: keyof Settings, value: any) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  return (
    <>
      {/* Floating Settings Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Tooltip label="Settings" withArrow>
          <ActionIcon
            size="xl"
            radius="xl"
            color="ocean-blue"
            variant="filled"
            className="transition-transform hover:scale-110 shadow-lg"
            onClick={() => setOpened(true)}
          >
            <IconSettings size={24} />
          </ActionIcon>
        </Tooltip>
      </div>

      {/* Right-side Drawer */}
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title={<Text fw={700}>Settings</Text>}
        position="right"
        padding="xl"
        size="md"
      >
        <Stack gap={24}>
          {/* Appearance Section */}
          <Text fw={600} size="sm">
            Appearance
          </Text>
          <Divider />

          <SimpleGrid cols={2} spacing="md">
            <SettingItem
              label="Dark Mode"
              icon={<IconSun size={18} />}
              checked={colorScheme === "dark"}
              onToggle={toggleColorScheme}
            />
            <SettingItem
              label="Animations"
              icon={<IconMoonStars size={18} />}
              checked={settings.animations}
              onToggle={() => handleToggle("animations")}
            />
            <SettingItem
              label="Font Size"
              customComponent={
                <Slider
                  value={settings.fontSize}
                  onChange={(val) => handleChange("fontSize", val)}
                  min={10}
                  max={24}
                  step={1}
                  marks={[
                    { value: 10, label: "10px" },
                    { value: 18, label: "18px" },
                    { value: 24, label: "24px" },
                  ]}
                  color="ocean-blue"
                />
              }
            />
            <SettingItem
              label="Theme Color"
              icon={<IconPalette size={18} />}
              customComponent={
                <ColorInput
                  value={settings.themeColor}
                  onChange={(val) => handleChange("themeColor", val)}
                />
              }
            />
            <SettingItem
              label="Language"
              customComponent={
                <Select
                  value={settings.language}
                  onChange={(val) => handleChange("language", val)}
                  data={[
                    { value: "en", label: "English" },
                    { value: "fr", label: "French" },
                    { value: "es", label: "Spanish" },
                  ]}
                />
              }
            />
          </SimpleGrid>

          {/* Notifications Section */}
          <Text fw={600} size="sm">
            Notifications
          </Text>
          <Divider />

          <SimpleGrid cols={2} spacing="md">
            <SettingItem
              label="Email Alerts"
              checked={settings.emailAlerts}
              onToggle={() => handleToggle("emailAlerts")}
            />
            <SettingItem
              label="Push Notifications"
              checked={settings.pushNotifications}
              onToggle={() => handleToggle("pushNotifications")}
            />
            <SettingItem
              label="Extra Panels"
              checked={settings.extraPanels}
              onToggle={() => handleToggle("extraPanels")}
            />
          </SimpleGrid>
        </Stack>
      </Drawer>
    </>
  );
}
