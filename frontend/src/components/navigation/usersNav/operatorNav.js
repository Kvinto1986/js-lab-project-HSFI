import {Link} from "react-router-dom";
import React from "react";

const OperatorNav = ({user}) => {
    const list = [];

    if (Array.from(user.tasks).includes('createNewSeller')) list.push(<li  key={'createNewSeller'}>
        <Link className="usersNavigationContainerLink" to="/newSeller">Create new seller</Link></li>)
    if (Array.from(user.tasks).includes('createSellerCard')) list.push(<li  key={'createSellerCard'}>
        <Link className="usersNavigationContainerLink" to="/sellerCards">Sellers cards</Link></li>)
    if (Array.from(user.tasks).includes('getCall')) list.push(<li  key={'getCall'}>
        <Link className="usersNavigationContainerLink" to="/calls">Calls</Link></li>)
    if (Array.from(user.tasks).includes('inspection')) list.push(<li  key={'inspection'}>
        <Link className="usersNavigationContainerLink" to="/inspection">inspection</Link></li>)

return (
    <div className="usersNavigationContainer">
        <ul >
            {list}
        </ul>
    </div>
)
}

export default OperatorNav