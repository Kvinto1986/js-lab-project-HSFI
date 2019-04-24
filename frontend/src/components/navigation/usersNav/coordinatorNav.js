import {Link} from "react-router-dom";
import React from "react";

const CoordinatorNav = () => {
        return (
            <div className="usersNavigationContainer">
                <ul >
                    <li >
                        <Link className="usersNavigationContainerLink" to="/sellerCards">Sellers cards</Link></li>
                    <li >
                        <Link className="usersNavigationContainerLink" to="/newSeller">Create new seller</Link></li>
                    <li >
                        <Link className="usersNavigationContainerLink" to="/calls">Calls</Link></li>
                    <li >
                        <Link className="usersNavigationContainerLink" to="/inspection">inspection</Link></li>
                    <li >
                        <Link className="usersNavigationContainerLink" to="/operatorsProfiles">Operators profile</Link>

                    </li>
                </ul>
            </div>
        )
    }

    export default CoordinatorNav