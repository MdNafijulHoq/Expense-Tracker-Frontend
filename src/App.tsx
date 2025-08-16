import { RouterProvider } from "react-router";
import { ThemeProvider } from "./provider/theme.provider";
import { router } from "./router";
import { Toaster } from "./components/ui/sonner";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store";

const App = () => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster richColors />
      </ThemeProvider>
    </ReduxProvider>
  );
};

export default App;
