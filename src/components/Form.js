import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createTransaction} from "../features/transaction/transactionSlice";

function Form(props) {

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');

    const dispatch = useDispatch();
    const {isLoading, isError,error} = useSelector(state => state.transaction)
    const handleCreate = (e) => {
        e.preventDefault();
        console.log('name',name,'type',type,amount,'amount');
        dispatch(
            createTransaction({
            name,
            type,
            amount: Number(amount),
        })
        );
    }
    return (
        <div className="form">
            <h3>Add new transaction</h3>
            <form onSubmit={handleCreate}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter expense name"
                    onChange={e => setName(e.target.value)}
                />
            </div>

            <div className="form-group radio">
                <label htmlFor="type">Type</label>
                <div className="radio_group">
                    <input
                        type="radio"
                        value="income"
                        name="type"
                        checked={type==='income'}
                        onChange={e => setType('income')}
                    />
                    <label htmlFor="type">Income</label>
                </div>
                <div className="radio_group">
                    <input
                        type="radio"
                        value="expense"
                        name="type"
                        placeholder="Expense"
                        checked={type==='expense'}
                        onChange={e => setType('expense')}
                    />
                    <label htmlFor="transaction_type">Expense</label>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                    id="amount"
                    type="number"
                    placeholder="300"
                    name="amount"
                    onChange={e => setAmount(e.target.value)}
                />
            </div>

            <button disabled={isLoading} type="submit" className="btn">Add Transaction</button>

                {(!isLoading && isError) && <p className="error">{error}</p> }
            </form>

            <button className="btn cancel_edit">Cancel Edit</button>
        </div>
    );
}

export default Form;