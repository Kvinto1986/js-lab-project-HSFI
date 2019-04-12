import {Link} from "react-router-dom";
import React from "react";

const ManagerNav = () => {
        return (
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <ul className="navbar-nav ml-auto list-inline">
                    <li className="nav-item">
                        <Link className="nav-link" to="/sellerCards">Sellers cards</Link></li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/newSeller">Create new seller</Link></li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/calls">Calls</Link></li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/inspection">Inspection</Link></li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/operatorsProfiles">Operators profile</Link></li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/coordinatorsProfiles">Coordinators profile</Link></li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin">Admin page</Link>
                    </li>
                </ul>
            </div>
        )

};

export default ManagerNav