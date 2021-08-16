import {withNavigationWatcher} from "./contexts/Navigation";
import {
  HomePage,
  CountriesPage,
  ProfilePage,
  AboutPage,
  SoatoPage,
  SooguPage,
  KfsPage,
  KopfPage,
  KspdPage,
} from "./pages";

const routes = [
  {
    path: "/home",
    component: HomePage,
  },
  {
    path: "/profile",
    component: ProfilePage,
  },
  {
    path: "/countries",
    component: CountriesPage,
  },
  {
    path: "/soato",
    component: SoatoPage,
  },
  {
    path: "/soogu",
    component: SooguPage,
  },
  {
    path: "/kfs",
    component: KfsPage,
  },
  {
    path: "/kopf",
    component: KopfPage,
  },
  {
    path: "/kspd",
    component: KspdPage,
  },
  {
    path: "/about",
    component: AboutPage,
  },
];

export default routes.map((route) => {
  return {
    ...route,
    component: withNavigationWatcher(route.component),
  };
});
