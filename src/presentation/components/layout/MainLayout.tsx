import { Outlet } from "react-router-dom";
import ToggleTheme from "../ToggleTheme";

const MainLayout = () => {
  return (
    <>
      <header>
        <h1>Main layout</h1>
        <ToggleTheme />
      </header>
      <Outlet />
    </>
  );
};
export default MainLayout;
