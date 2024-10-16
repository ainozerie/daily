import { Link, Outlet, useLocation } from "react-router-dom";
import './app.css'
import { useState } from "react";
import Icon from "../Icon/Icon";

export default function App() {
    const {pathname} = useLocation();
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const setLinkActive = (path: string) => {
        return pathname === path ? 'active' : '';
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <div className="app">
            <header>
                <Link to='/' className={setLinkActive('/')}>
                    <span className="logo">
                        <span className="rocket-wrapper"><Icon name='rocket_launch'/></span>
                        <span className="title">sisu</span>
                    </span>
                </Link>
                <nav>
                    {!menuOpen && <span onClick={toggleMenu} className="material-symbols-outlined icon">menu</span>}
                    {menuOpen && <Link onClick={toggleMenu} to='/tasks' className={setLinkActive('/tasks')}>My goals</Link>}
                    {menuOpen && <Link onClick={toggleMenu} to='/tasks/new' className={setLinkActive('/tasks/new')}>Add new</Link>}
                    {menuOpen && <Link onClick={toggleMenu} to='/login' className={setLinkActive('/login')}>Login</Link>}
                    {menuOpen && <span onClick={toggleMenu} className="material-symbols-outlined icon">close</span>}
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}
