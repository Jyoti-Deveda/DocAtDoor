import React from 'react'
import Style from "./Layout.module.css";
import { Outlet, Link } from 'react-router-dom';


const Layout = ({ children }) => {
    return (
        <div>
            <div>nav bar here</div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default Layout