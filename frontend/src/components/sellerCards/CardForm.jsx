import React from 'react';
import PropTypes from "prop-types";

import Select from 'react-select'

import currencyList from '../../resourses/currency';

const CardForm = ({
                      user, seller, errors, handleSubmit,
                      handleInputChange, cardsCount, cost, handleChangeCurrency, currency
                  }) => {
    if (seller) {
        return (
            <form onSubmit={handleSubmit} className="cardFormContainer">
                <label>Operator name</label>
                <input
                    type="text"
                    placeholder={user.name}
                    disabled='disabled'
                    value={user.name}
                />
                {errors.cardSerial && (<div className="invalidFeedbackCard">{errors.cardSerial}</div>)}
                <label>Cards count</label>
                <input
                    type="number"
                    min="1"
                    placeholder="Cards Count"
                    name="cardsCount"
                    onChange={handleInputChange}
                    value={cardsCount}
                    required
                />
                {errors.cardsCount && (<div className="invalidFeedback">{errors.cardsCount}</div>)}

                <label>Card cost</label>
                <input
                    type="number"
                    min="1"
                    placeholder="Cost"
                    name="cost"
                    onChange={handleInputChange}
                    value={cost}
                    required
                />
                {errors.cost && (<div className="invalidFeedback">{errors.cost}</div>)}

                <label>Currency</label>
                <Select
                    options={currencyList}
                    placeholder={'Select currency...'}
                    value={currency}
                    onChange={handleChangeCurrency}
                    className={'cardFormSelect'}
                />

                {errors.currency && (<div className="invalidFeedback">{errors.currency}</div>)}
                <button type="submit" className={'btnSubmit'} onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        )
    } else return null

};

CardForm.propTypes = {
    user: PropTypes.object,
    seller: PropTypes.object,
    handleSubmit: PropTypes.func,
    cardsCount: PropTypes.string,
    cost: PropTypes.string,
    handleChangeCurrency: PropTypes.func,
    currency: PropTypes.string
};

export default CardForm