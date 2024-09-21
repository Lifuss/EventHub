import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="p-5 md:p-10 mx-auto">
      <Outlet />
    </main>
  );
};

export default Layout;
