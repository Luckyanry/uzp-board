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
      text: formatMessage("profile"),
      path: "/profile",
      icon: "user",
    },
    {
      text: formatMessage("directory"),
      icon: "mediumiconslayout",
      items: [
        {
          text: formatMessage("countries"),
          path: "/countries",
        },
        {
          text: formatMessage("soato"),
          path: "/soato",
        },
        {
          text: formatMessage("soogu"),
          path: "/soogu",
        },
        {
          text: formatMessage("csdp"),
          path: "/csdp",
        },
      ],
    },
    {
      text: formatMessage("opf_title"),
      icon: "product",
      items: [
        {
          text: formatMessage("kfs"),
          path: "/kfs",
        },
        {
          text: formatMessage("kopf"),
          path: "/kopf",
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
