import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { IconButton, Tooltip } from "@radix-ui/themes";

function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      {mounted && (
        <Tooltip content="Toggle theme">
          <IconButton variant="ghost" className="flex" onClick={handleChange}>
            {theme === "dark" ? (
              <MoonIcon width="24" height="24" />
            ) : (
              <SunIcon width="24" height="24" />
            )}
          </IconButton>
        </Tooltip>
      )}
    </>
  );
}

export default ThemeSwitch;
