import React, {Component} from 'react';
import './sellerCardsStyles.css'
import Select from 'react-select'
import currencyList from '../../resourses/currency'

class CardForm extends Component {

    render() {
        if (this.props.seller) {
            const {currency}=this.props.currency;
            return (
                <div className="cardFormContainer">
                    <h2>Registration user card</h2>
                    <form onSubmit={this.props.handleSubmit} >
                        <input
                            type="text"
                            placeholder={this.props.user.name}
                            disabled = 'disabled'
                            value={this.props.user.name}
                        />

                        <input
                            type="text"
                            placeholder="Card Serial"
                            name="cardSerial"
                            onChange={this.props.handleInputChange}
                            value={this.props.cardSerial}
                        />
                        {this.props.errors.cardSerial && (<div className="invalidFeedbackCard">{this.props.errors.cardSerial}</div>)}

                        <input
                            type="number"
                            placeholder="Cards Count"
                            name="cardsCount"
                            onChange={this.props.handleInputChange}
                            value={this.props.cardsCount}
                        />
                        {this.props.errors.cardsCount && (<div className="invalidFeedbackCard">{this.props.errors.cardsCount}</div>)}

                        <input
                            type="text"
                            placeholder="Cost"
                            name="cost"
                            onChange={this.props.handleInputChange}
                            value={this.props.cost}
                        />
                        {this.props.errors.cost && (<div className="invalidFeedbackCard">{this.props.errors.cost}</div>)}

                        <Select
                            options={currencyList}
                            placeholder={'Select currency...'}
                            value={currency}
                            onChange={this.props.handleChangeCurrency}
                            className={'currencySelect'}
                        />

                        {this.props.errors.currency && (<div className="invalidFeedbackCard">{this.props.errors.currency}</div>)}
                        <button type="submit">
                            Submit
                        </button>
                    </form>
                </div>)
        }
        else return null

    }
}

export default CardForm