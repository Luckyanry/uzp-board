import {withNavigationWatcher} from "./contexts/Navigation";
import {
  HomePage,
  ProfilePage,
  DataGridTypePage,
  TreeListTypePage,
} from "./pages";

const dataGridPagesPath = ["countries", "soogu", "shortDics"];
const treeListPagesPath = ["soato", "kspd", "kfs", "kopf"];

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
