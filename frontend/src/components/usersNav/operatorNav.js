import {Link} from "react-router-dom";
import React from "react";

const OperatorNav = (tasks) => {
    const list = [];

    if (tasks.includes('createNewSeller')) list.push(<li className="nav-item">
        <Link className="nav-link" to="/newSeller">Create new seller</Link></li>)
    if (tasks.includes('createNewSeller')) list.push(<li className="nav-item">
        <Link className="nav-link" to="/sellerCards">Sellers cards</Link></li>)
    if (tasks.includes('createNewSeller')) list.push(<li className="nav-item">
        <Link className="nav-link" to="/calls">Calls</Link></li>)
    if (tasks.includes('createNewSeller')) list.push(<li className="nav-item">
        <Link className="nav-link" to="/inspection">inspection</Link></li>)

return (
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <ul className="navbar-nav ml-auto list-inline">
            {list}
        </ul>
    </div>
)
}

export default OperatorNav