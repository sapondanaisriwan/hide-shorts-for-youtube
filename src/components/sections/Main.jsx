import { Container, Theme } from "@radix-ui/themes";
import {
  KeyHideShortsOnChannelFeed,
  KeyHideShortsOnHashtagFeed,
  KeyHideShortsOnHomeFeed,
  KeyHideShortsOnSearchFeed,
  KeyHideShortsOnSubscriptionFeed,
  KeyHideShortsOnWatchFeed,
  KeyHideTab,
  KeyRedirectShorts,
} from "../../data/storage-keys";
import ToggleSwitch from "../ui/ToggleSwitch";

function Main() {
  return (
    <Theme accentColor="violet">
      <Container className="p-3">
        <main className="flex flex-col gap-2">
          <ToggleSwitch
            label={"Redirect Shorts"}
            storageKey={KeyRedirectShorts}
          />
          <ToggleSwitch label={"Hide Tab"} storageKey={KeyHideTab} />
          <ToggleSwitch
            label={"Hide Home Feed Shorts"}
            storageKey={KeyHideShortsOnHomeFeed}
          />
          <ToggleSwitch
            label={"Hide Watch Feed Shorts"}
            storageKey={KeyHideShortsOnWatchFeed}
          />
          <ToggleSwitch
            label={"Hide Channel Feed Shorts"}
            storageKey={KeyHideShortsOnChannelFeed}
          />
          <ToggleSwitch
            label={"Hide Search Feed Shorts"}
            storageKey={KeyHideShortsOnSearchFeed}
          />
          <ToggleSwitch
            label={"Hide Subscription Feed Shorts"}
            storageKey={KeyHideShortsOnSubscriptionFeed}
          />
          <ToggleSwitch
            label={"Hide Hashtag Feed Shorts"}
            storageKey={KeyHideShortsOnHashtagFeed}
          />
        </main>
      </Container>
    </Theme>
  );
}

export default Main;
