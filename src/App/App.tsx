import { Link, Outlet, useLocation } from "react-router-dom";
import './app.css'

export default function App() {
    const {pathname} = useLocation();

    const setLinkActive = (path: string) => {
        return pathname === path ? 'active' : '';
    }

    return (
        <div className="app">
            <header>
                <Link to='/' className={setLinkActive('/')}>Goals</Link>
                <nav>
                    <Link to='/tasks' className={setLinkActive('/tasks')}>My goals</Link>
                    <Link to='/tasks/new' className={setLinkActive('/tasks/new')}>Add new</Link>
                    <Link to='/login' className={setLinkActive('/login')}>Login</Link>
                </nav>
            </header>
            <Outlet />
        </div>
    )
}
