import {useLocalization} from "./contexts/LocalizationContext";

export const AppNavigation = () => {
  const {formatMessage} = useLocalization();

  const directoryFolder = ["countries", "soato", "soogu", "kspd", "oked"];
  const opfFolder = ["kfs", "kopf"];
  const usersDir = ["profile", "usersList", "usersRole", "usersGroup"];

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
      text: formatMessage("users_dir_title"),
      icon: "user",
      items: pathCreator(usersDir),
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
      path: "/ShortDics",
      icon: "tableproperties",
    },
  ];
};
