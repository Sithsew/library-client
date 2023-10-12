import { Outlet } from "react-router-dom";
import DrawerAppBar from "./DrawerAppBar";

const Layout = () => {
  return (
    <>
      <DrawerAppBar />
      <Outlet />
    </>
  );
};

export default Layout;
