import { SideLink, Actions } from "@twilio/flex-ui";
export default function TestView({ activeView }) {
  const URL =
    "https://twilio78-dev-ed.develop.my.site.com/s/detail/5004S000004SBqqQAG";
  return (
    <SideLink
      showLabel={true}
      icon="Thumbup"
      iconActive="ThumbupBold"
      isActive={activeView === "shop-view"}
      onClick={() => {
        window.open(URL, "_blank");
      }}
    >
      Experience Cloud
    </SideLink>
  );
}
