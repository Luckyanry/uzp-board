import {useLocalization} from "./contexts/LocalizationContext";

export const AppNavigation = () => {
  const {formatMessage} = useLocalization();

  return [
    {
      text: formatMessage("home"),
      path: "/home",
      icon: "home",
    },
    {
      text: formatMessage("directory"),
      icon: "folder",
      items: [
        {
          text: formatMessage("profile"),
          path: "/profile",
        },
        {
          text: formatMessage("countries"),
          path: "/countries",
        },
        {
          text: formatMessage("soato"),
          path: "/soato",
        },
      ],
    },
    {
      text: formatMessage("about"),
      path: "/about",
      icon: "info",
    },
  ];
};
