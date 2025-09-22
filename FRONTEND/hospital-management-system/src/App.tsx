import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import AppRoutes from "./routes/AppRoutes";
import theme from "./theme/theme";
import SettingsButton from "./components/SettingsButton";

function App() {
  return (
    <MantineProvider theme={theme}>
      <AppRoutes />
      <SettingsButton />
    </MantineProvider>
  );
}

export default App;
