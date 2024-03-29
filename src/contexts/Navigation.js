import React, {useState, createContext, useContext, useEffect} from "react";

const NavigationContext = createContext({});
const useNavigation = () => useContext(NavigationContext);

function NavigationProvider(props) {
  const [navigationData, setNavigationData] = useState({currentPath: "/home"});

  return (
    <NavigationContext.Provider
      value={{navigationData, setNavigationData}}
      {...props}
    />
  );
}

function withNavigationWatcher(Component) {
  return function (props) {
    const {path} = props.match;
    const {setNavigationData} = useNavigation();

    sessionStorage.setItem("currentPath", path);

    useEffect(() => {
      setNavigationData({currentPath: path});
    }, [path, setNavigationData]);

    return React.createElement(Component, props);
  };
}

export {NavigationProvider, useNavigation, withNavigationWatcher};
