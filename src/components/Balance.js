import React from 'react';
import {useSelector} from "react-redux";

function Balance(props) {
    const {transactions} =    useSelector(state => state.transaction) || {};

    const clculateIncome = () => {
        let income = 0;
        transactions.forEach(txn => {
            const {type, amount} = txn;
            type === 'income' ? income+= amount : income-= amount;
        })
        return income;
    }
    return (
        <div className="top_card">
            <p>Your Current Balance</p>
            <h3>
                <span>৳</span>
                {transactions.length > 0 ?   <span>{clculateIncome(transactions)}</span> : 0 }
            </h3>
        </div>
    );
}

export default Balance;