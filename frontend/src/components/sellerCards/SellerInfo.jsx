import React from 'react';
import './sellerCardsStyles.css'

const SellerInfo =({seller})=> {
    if (seller) {
        return (
            <div className="sellerInfo">
                <h3>Seller info</h3>
                <img src={seller.photo}/>
                <ul>
                    <li><span><strong>Name: </strong></span><span>{seller.name}</span></li>
                    <li><span><strong>License: </strong></span><span>{seller.license}</span></li>
                    <li><span><strong>Food group: </strong></span><span>{seller.foodGroup}</span></li>
                    <li><span><strong>Phone: </strong></span><span>{seller.phone}</span></li>
                    <li><span><strong>Email: </strong></span><span>{seller.email}</span></li>
                </ul>
            </div>
        )
    } else return null
};

export default SellerInfo