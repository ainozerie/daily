import { useState } from 'react';
import './menu.css'
import { Link } from 'react-router-dom';

export default function Menu({open, closeMenu}:{open: boolean, closeMenu: () => void}) {

    return (
        <>
        <div className={open ? 'menu open' : 'menu'}>
            <Link onClick={closeMenu} to='/tasks'>My goals</Link>
            <Link onClick={closeMenu} to='/tasks/new'>Add new</Link>
            <Link onClick={closeMenu} to='/login'>Login</Link>
        </div>
        <div onClick={closeMenu} className={open ? 'backdrop visible' : 'backdrop'}></div>
        </>
    )
}
