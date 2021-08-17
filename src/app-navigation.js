import {useLocalization} from "./contexts/LocalizationContext";

export const AppNavigation = () => {
  const {formatMessage} = useLocalization();

  const directoryFolder = ["countries", "soato", "soogu", "kspd"];
  const opfFolder = ["kfs", "kopf"];

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
      items: pathCreator(directoryFolder),
    },
    {
      text: formatMessage("opf_title"),
      icon: "product",
      items: pathCreator(opfFolder),
    },
    {
      text: formatMessage("shortDics"),
      path: "/shortDics",
      icon: "tableproperties",
    },
  ];
};
