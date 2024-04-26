import { Flex, Text } from "@radix-ui/themes";
import ExtensionSetting from "./ExtensionSetting";
import ThemeSwitch from "../ui/ThemeSwitch";
import Logo from "../icons/Logo";

function Header() {
  return (
    <header className="flex justify-between items-center p-3 bg-gray-1 dark:bg-gray-3">
      <Text as="span" weight="medium" className="select-none">
        <a
          href="https://github.com/sapondanaisriwan/hide-shorts-for-youtube"
          target="_blank"
          className="flex items-center gap-2"
        >
          <Logo />
          <Text as="span">Hide Shorts</Text>
        </a>
      </Text>
      <Flex gap="4">
        <ThemeSwitch />
        <ExtensionSetting />
      </Flex>
    </header>
  );
}

export default Header;
