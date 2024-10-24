import { Link, Outlet, useLocation } from "react-router-dom";
import './app.css'
import { useState } from "react";
import Icon from "../Icon/Icon";
import Menu from "../Menu/Menu";

export default function App() {
    const {pathname} = useLocation();
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <div className="app">
            <header>
                <Link to='/'>
                    <span className="logo">
                        <span className="rocket-wrapper"><Icon name='rocket_launch'/></span>
                        <span className="title">sisu</span>
                    </span>
                </Link>
                <nav>
                    {!menuOpen && <span onClick={toggleMenu} className="material-symbols-outlined icon">menu</span>}
                </nav>
            </header>
            <Menu open={menuOpen} closeMenu={toggleMenu}/>
            <main>
                <Outlet />
            </main>
        </div>
    )
}
