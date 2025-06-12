import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            TaskList
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/AddTask" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            AddTask
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;