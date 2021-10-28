import {withNavigationWatcher} from "../contexts/Navigation";
import {HomePage, DataGridPage, TreeListPage} from "../pages";

const siteStructureArr = JSON.parse(sessionStorage.getItem("siteStructure"));

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
          component,
        }
    );

export default routes &&
  routes.map((route) => {
    console.log(`route`, route);
    return {
      ...route,
      component: withNavigationWatcher(route.component),
    };
  });
