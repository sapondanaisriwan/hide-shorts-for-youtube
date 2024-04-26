import { Flex, Text, Switch } from "@radix-ui/themes";
import { useStorageState } from "../../hooks/useStorage";
import { Box } from "@radix-ui/themes";

function ToggleSwitch({ storageKey, label }) {
  const [isSelected, setIsSelected, isLoaded] = useStorageState(storageKey);

  return (
    <>
      {isLoaded && (
        <Box>
          <Text
            as="label"
            size="2"
            className={`block p-3 rounded-4 bg-slate-1 hover:bg-slate-2 dark:bg-slate-3 dark:hover:bg-slate-5 select-none`}
          >
            <Flex gap="2" justify="between">
              <Text as="span">{label}</Text>
              <Switch
                size="2"
                // variant="violet"
                checked={isSelected}
                onCheckedChange={setIsSelected}
              />
            </Flex>
          </Text>
        </Box>
      )}
    </>
  );
}

export default ToggleSwitch;
