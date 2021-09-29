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
  "userObjects",
  "roleObjects",
  "groupObjects",
  "mahalla",
  "personObjects",
  "orgUnits",
  "employees",
  "legals",
  "recordLog",
  "fieldLog",
];

const treeListPagesPath = [
  "soato",
  "kspd",
  "kfs",
  "kopf",
  "oked",
  "auditSettingsMaster",
  "auditSettings",
];

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

export default routes.map((route) => ({
  ...route,
  component: withNavigationWatcher(route.component),
}));
