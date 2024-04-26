import { ThemeProvider } from "next-themes";
import { Box, Theme } from "@radix-ui/themes";
import Header from "./components/sections/Header";
import Main from "./components/sections/Main";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem="false">
      <Theme accentColor="gray">
        <Box className="w-[340px] mx-auto bg-slate-3 dark:bg-slate-1 border border-slate-5">
          <Header />
          <Main />
        </Box>
      </Theme>
    </ThemeProvider>
  );
}

export default App;
