import {withNavigationWatcher} from "../contexts/Navigation";
import {HomePage, DataGridPage, TreeListPage} from "../pages";

const siteStructureArr = JSON.parse(localStorage.getItem("siteStructure"));

const routes =
  siteStructureArr &&
  siteStructureArr
    .map(({path, uiComponents}) => ({
      path,
      component:
        (uiComponents === "HomePage" && HomePage) ||
        (uiComponents === "DataGridPage" && DataGridPage) ||
        (uiComponents === "TreeListPage" && TreeListPage),
    }))
    .filter(
      ({path, component}) =>
        path && {
          path,
          component: withNavigationWatcher(component),
        }
    );

export default routes &&
  routes.map((route) => ({
    ...route,
    component: withNavigationWatcher(route.component),
  }));
