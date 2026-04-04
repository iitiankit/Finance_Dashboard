import Sidebar from "./Sidebar";

const Layout = ({ children, setActivePage }) => {
  return (
    <div className="flex">
      <Sidebar setActivePage={setActivePage} />

      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  );
};

export default Layout;