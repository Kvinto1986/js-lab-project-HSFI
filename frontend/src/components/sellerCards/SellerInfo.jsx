import React, {Component} from 'react';
import './sellerCardsStyles.css'

class SellerInfo extends Component {

    render() {
        if (this.props.seller) {
            const seller=this.props.seller
            return (

                    <div className="sellerInfoContainer">
                        <img src={'../../../static/'+seller.photo}/>
                        <ul>
                            <li><span>Name:</span><span>{seller.name}</span></li>
                            <li><span>License:</span><span>{seller.license}</span></li>
                            <li><span>Food group:</span><span>{seller.foodGroup}</span></li>
                            <li><span>Phone:</span><span>{seller.phone}</span></li>
                            <li><span>Email:</span><span>{seller.email}</span></li>
                        </ul>

                    </div>)
        } else return null
    }
}

export default SellerInfo