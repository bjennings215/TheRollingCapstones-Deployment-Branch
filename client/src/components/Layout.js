import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
      <>
      <div className="header">
        <nav className="dashboard_navbar">
          <div className="logo">
            Capcodes!
          </div>
          <ul className="menu_options">
            <li >
              <Link to="/layout">Home</Link>
            </li>
            <li>
              <Link to="/layout/modules">Modules</Link>
            </li>
            <li>
              <Link to="/layout/profile">Profile</Link>
            </li>
          </ul>
        </nav>
        </div>
        <Outlet />
      </>
    )
  };
  
  export default Layout;