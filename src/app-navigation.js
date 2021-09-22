import {useLocalization} from "./contexts/LocalizationContext";

export const AppNavigation = () => {
  const {formatMessage} = useLocalization();

  const individualsAndLegalDir = ["personObjects", "legals"];
  const staffDir = ["employees", "orgUnits"];
  const userAccessControlDir = ["userObjects", "roleObjects", "groupObjects"];
  const administrationDir = [];
  const dictionariesDir = [
    "countries",
    "soato",
    "soogu",
    "oked",
    "kspd",
    "mahalla",
    "kfs",
    "kopf",
    "ShortDics",
  ];
  // "profile",

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
      text: formatMessage("msgDirectoryILEMenuTitle"),
      icon: "toolbox",
      items: pathCreator(individualsAndLegalDir),
    },
    {
      text: formatMessage("msgStaffDirMenuTitle"),
      icon: "group",
      items: pathCreator(staffDir),
    },
    {
      text: formatMessage("msgUsersDirMenuTitle"),
      icon: "key",
      items: pathCreator(userAccessControlDir),
    },
    {
      text: formatMessage("msgAdministrationDirMenuTitle"),
      icon: "paste",
      items: pathCreator(administrationDir),
    },
    {
      text: formatMessage("msgDictionariesDirMenuTitle"),
      icon: "folder",
      items: pathCreator(dictionariesDir),
    },
  ];
};
