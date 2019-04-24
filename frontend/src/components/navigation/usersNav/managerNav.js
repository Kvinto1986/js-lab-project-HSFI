import {Link} from "react-router-dom";
import React from "react";


const ManagerNav = () => {
        return (
            <div className="usersNavigationContainer">
                <ul>
                    <li >
                        <Link  className="usersNavigationContainerLink" to="/sellerCards">Sellers cards</Link></li>
                    <li >
                        <Link className="usersNavigationContainerLink" to="/newSeller">Create new seller</Link></li>
                    <li >
                        <Link className="usersNavigationContainerLink" to="/calls">Calls</Link></li>
                    <li >
                        <Link className="usersNavigationContainerLink" to="/inspection">Inspection</Link></li>
                    <li >
                        <Link className="usersNavigationContainerLink" to="/operatorsProfiles">Operators profile</Link></li>
                        <li >
                            <Link className="usersNavigationContainerLink" to="/coordinatorsProfiles">Coordinators profile</Link></li>
                            <li >
                                <Link className="usersNavigationContainerLink" to="/admin">Admin page</Link>
                    </li>
                </ul>
            </div>
        )

};

export default ManagerNav