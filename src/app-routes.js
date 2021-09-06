import {withNavigationWatcher} from "./contexts/Navigation";
import {
  HomePage,
  ProfilePage,
  DataGridTypePage,
  TreeListTypePage,
} from "./pages";

const dataGridPagesPath = [
  "countries",
  "soogu",
  "ShortDics",
  "usersList",
  "usersRole",
  "usersGroup",
  "mihalla",
];
const treeListPagesPath = ["soato", "kspd", "kfs", "kopf", "oked"];

const routes = [
  {
    path: "/home",
    component: HomePage,
  },
  {
    path: "/profile",
    component: ProfilePage,
  },
  ...pathCreator(dataGridPagesPath, DataGridTypePage),
  ...pathCreator(treeListPagesPath, TreeListTypePage),
];

function pathCreator(pathTitle, component) {
  return pathTitle.map((item) => {
    return {
      path: `/${item}`,
      component,
    };
  });
}

export default routes.map((route) => {
  return {
    ...route,
    component: withNavigationWatcher(route.component),
  };
});
