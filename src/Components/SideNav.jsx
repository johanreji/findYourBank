import './SideNav.css';
import { NavLink } from "react-router-dom";

const SideNav = () => {
    return <nav className="sidenav">
        <ul>
            <li>
                <NavLink to="/all-banks" className={(navData) => navData.isActive ? "active" : "link"}>All banks</NavLink>
            </li>
            <li>
                <NavLink to="/favourites" className={(navData) => navData.isActive ? "active" : "link"}>Favourites</NavLink>
            </li>
        </ul>
    </nav>
}

export default SideNav;