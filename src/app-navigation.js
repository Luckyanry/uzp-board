import {useLocalization} from "./contexts/LocalizationContext";

export const AppNavigation = () => {
  const {formatMessage} = useLocalization();

  const firstFolder = ["countries", "soato", "soogu", "kspd"];
  const secondFolder = ["kfs", "kopf"];

  function pathCreator(pathTitle) {
    return pathTitle.map((item) => {
      return {
        text: formatMessage(item),
        path: `/${item}`,
      };
    });
  }

  return [
    {
      text: formatMessage("home"),
      path: "/home",
      icon: "home",
    },
    {
      text: formatMessage("profile"),
      path: "/profile",
      icon: "user",
    },
    {
      text: formatMessage("directory"),
      icon: "mediumiconslayout",
      items: pathCreator(firstFolder),
    },
    {
      text: formatMessage("opf_title"),
      icon: "product",
      items: pathCreator(secondFolder),
    },
  ];
};
