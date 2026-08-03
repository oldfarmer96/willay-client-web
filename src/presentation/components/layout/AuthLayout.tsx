import { Outlet } from "react-router-dom";
import ToggleTheme from "../ToggleTheme";

const AuthLayout = () => {
  return (
    <>
      <header>
        <h1>Auth layout</h1>
        <ToggleTheme />
      </header>
      <Outlet />
    </>
  );
};
export default AuthLayout;
