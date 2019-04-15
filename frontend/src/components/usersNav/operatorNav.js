import {Link} from "react-router-dom";
import React from "react";

const OperatorNav = ({user}) => {
    const list = [];

    if (Array.from(user.tasks).includes('createNewSeller')) list.push(<li className="nav-item" key={'createNewSeller'}>
        <Link className="nav-link" to="/newSeller">Create new seller</Link></li>)
    if (Array.from(user.tasks).includes('createSellerCard')) list.push(<li className="nav-item" key={'createSellerCard'}>
        <Link className="nav-link" to="/sellerCards">Sellers cards</Link></li>)
    if (Array.from(user.tasks).includes('getCall')) list.push(<li className="nav-item" key={'getCall'}>
        <Link className="nav-link" to="/calls">Calls</Link></li>)
    if (Array.from(user.tasks).includes('inspection')) list.push(<li className="nav-item" key={'inspection'}>
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