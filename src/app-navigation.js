import {useEffect, useState} from "react";

import {useLocalization} from "./contexts/LocalizationContext";
import {FetchData} from "./api/pages-fetch";

import homeIcon from "./icons/home.svg";
import legalsIcon from "./icons/briefcase.svg";
import staffIcon from "./icons/staff.svg";
import userACIcon from "./icons/userAC.svg";
import administrationACIcon from "./icons/administration.svg";
import dictionariesIcon from "./icons/dictionaries.svg";

export const AppNavigation = () => {
  const [appNav, setAppNav] = useState([]);
  const {formatMessage} = useLocalization();

  const individualsAndLegalDir = ["personObjects", "legals"];
  const staffDir = ["employees", "orgUnits"];
  const userAccessControlDir = ["userObjects", "roleObjects", "groupObjects"];
  const dictionariesDir = [
    "countries",
    "soato",
    "soogu",
    "kspd",
    "mahalla",
    "oked",
    "kfs",
    "kopf",
    "shortDics",
  ];
  // "profile",

  useEffect(() => {
    if (!appNav) return;

    const fetchData = FetchData(
      "/siteStructure",
      "ShortDicsRecordsFlat&@name=SiteStructure",
      "hbdb"
    ).fetchColumnsSchemaData;

    fetchData.load().then(({data}) => {
      console.log(`app-navigation fetchData`, data);
      return setAppNav(data);
    });
    // eslint-disable-next-line
  }, []);

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

  const menu = appNav;
  console.log(`menu`, menu);
  // return menu;

  return [
    {
      text: formatMessage("msgHomeMenuTitle"),
      path: "/home",
      icon: homeIcon,
    },
    {
      text: formatMessage("msgDirectoryILEMenuTitle"),
      icon: legalsIcon,
      items: pathCreator(individualsAndLegalDir),
    },
    {
      text: formatMessage("msgStaffDirMenuTitle"),
      icon: staffIcon,
      items: pathCreator(staffDir),
    },
    {
      text: formatMessage("msgUsersDirMenuTitle"),
      icon: userACIcon,
      items: pathCreator(userAccessControlDir),
    },
    {
      text: formatMessage("msgAdministrationDirMenuTitle"),
      icon: administrationACIcon,
      items: [
        {
          text: formatMessage("msgPortalStructureEditor"),
          path: "/siteStructure",
        },
        {
          text: formatMessage("msgRightsEditor"),
          path: "/rights",
        },
        {
          text: formatMessage("msgAuditingAndLoggingUserActions"),
          items: [
            {
              text: formatMessage("msgAuditSettings"),
              path: "/auditSettingsMaster",
            },
            {
              text: formatMessage("msgLogUserActions"),
              path: "/recordLog",
            },
          ],
        },
        {
          text: formatMessage("msgErrorLog"),
          path: "/errorLog",
        },
      ],
    },
    {
      text: formatMessage("msgDictionariesDirMenuTitle"),
      icon: dictionariesIcon,
      items: pathCreator(dictionariesDir),
    },
  ];
};
