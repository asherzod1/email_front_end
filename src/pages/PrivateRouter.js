import React from 'react';
import {Navigate, Outlet} from "react-router-dom";

function PrivateRouter() {
    const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null
    return (
        <div>
            {token ?
                <Outlet/> :
                <Navigate to="/login" />
            }
        </div>
    );
}

export default PrivateRouter;
