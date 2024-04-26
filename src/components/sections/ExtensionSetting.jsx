import { ExternalLinkIcon, GearIcon } from "@radix-ui/react-icons";
import {
  Button,
  Flex,
  IconButton,
  Popover,
  Theme,
  Tooltip,
} from "@radix-ui/themes";
import ToggleSwitch from "../ui/ToggleSwitch";
import { KeyExtensionStatus } from "../../data/storage-keys";

function ExtensionSetting() {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <IconButton variant="ghost">
          <Tooltip content="Extension Setting">
            <GearIcon width={24} height={24} />
          </Tooltip>
        </IconButton>
      </Popover.Trigger>
      <Popover.Content width="212px" className="max-w-full">
        <Theme accentColor="green">
          <Flex className="flex flex-col gap-1 max-w-full w-full overflow-hidden">
            <ToggleSwitch label={"Enabled"} storageKey={KeyExtensionStatus} />
            <Button variant="soft" className="p-0 m-0">
              <a
                href="https://chromewebstore.google.com/detail/youtube-anti-shorts/lfhnlieoomhlancdfhihpopgkiekbefd"
                target="_blank"
                className="w-full flex justify-between items-center cursor-pointer p-3"
              >
                Rate Extension
                <ExternalLinkIcon />
              </a>
            </Button>
            <Button variant="soft" className="p-0 m-0 ">
              <a
                href="https://github.com/sapondanaisriwan/hide-shorts-for-youtube/issues"
                target="_blank"
                className="w-full flex justify-between items-center cursor-pointer p-3"
              >
                Help & Feedback
                <ExternalLinkIcon />
              </a>
            </Button>
          </Flex>
        </Theme>
      </Popover.Content>
    </Popover.Root>
  );
}

export default ExtensionSetting;
