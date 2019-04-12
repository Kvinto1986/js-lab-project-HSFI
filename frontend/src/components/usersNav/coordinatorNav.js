import {Link} from "react-router-dom";
import React from "react";

const CoordinatorNav = () => {
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
                        <Link className="nav-link" to="/inspection">inspection</Link></li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/operatorsProfiles">Operators profile</Link>

                    </li>
                </ul>
            </div>
        )
    }

    export default CoordinatorNav