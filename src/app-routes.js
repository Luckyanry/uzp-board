import {withNavigationWatcher} from "./contexts/Navigation";
import {HomePage, CountriesPage, ProfilePage, AboutPage} from "./pages";

const routes = [
  {
    path: "/countries",
    component: CountriesPage,
  },
  {
    path: "/profile",
    component: ProfilePage,
  },
  {
    path: "/home",
    component: HomePage,
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
