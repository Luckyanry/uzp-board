import {useLocalization} from "./contexts/LocalizationContext";

export const AppNavigation = () => {
  const {formatMessage} = useLocalization();

  const directoryFolder = ["countries", "soato", "soogu", "kspd", "oked"];
  const opfFolder = ["kfs", "kopf"];
  const usersDir = ["profile", "usersList", "usersRole", "usersGroup"];

  function pathCreator(pathTitle) {
    return pathTitle.map((item) => {
      return {
        text: formatMessage(customizeTitleMsg(item)),
        path: `/${item}`,
      };
    });
  }

  function customizeTitleMsg(message) {
    const changeFirstLetterToUpper = `${message[0].toUpperCase()}${message.slice(
      1
    )}`;
    return `msg${changeFirstLetterToUpper}MenuTitle`;
  }

  return [
    {
      text: formatMessage("msgHomeMenuTitle"),
      path: "/home",
      icon: "home",
    },
    {
      text: formatMessage("msgUsersDirMenuTitle"),
      icon: "user",
      items: pathCreator(usersDir),
    },
    {
      text: formatMessage("msgDirectoryILEMenuTitle"),
      icon: "mediumiconslayout",
      items: pathCreator(directoryFolder),
    },
    {
      text: formatMessage("msgOpfMenuTitle"),
      icon: "product",
      items: pathCreator(opfFolder),
    },
    {
      text: formatMessage("msgShortDicsMenuTitle"),
      path: "/ShortDics",
      icon: "tableproperties",
    },
  ];
};
