import {withNavigationWatcher} from "./contexts/Navigation";
import {
  HomePage,
  CountriesPage,
  ProfilePage,
  SoatoPage,
  SooguPage,
  KfsPage,
  KopfPage,
  KspdPage,
  // DataGridTypePage,
  // TreeListTypePage,
} from "./pages";

// const dataGridPagesPath = ["countries", "soogu"];
// const treeListPagesPath = ["soato", "kspd", "kfs", "kopf"];

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
  // ...pathCreator(dataGridPagesPath, DataGridTypePage),
  // ...pathCreator(treeListPagesPath, TreeListTypePage),
];

// function pathCreator(pathTitle, component) {
//   return pathTitle.map((item) => {
//     return {
//       path: `/${item}`,
//       component,
//     };
//   });
// }

export default routes.map((route) => {
  console.log(`route`, route);
  return {
    ...route,
    component: withNavigationWatcher(route.component),
  };
});
