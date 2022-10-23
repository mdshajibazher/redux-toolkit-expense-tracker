import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeTransaction, createTransaction} from "../features/transaction/transactionSlice";


function Form(props) {

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const [editMode,setEditMode] = useState(false);
    const dispatch = useDispatch();
    const {isLoading, isError,error} = useSelector(state => state.transaction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    let {editing} = useSelector(state => state.transaction);

    //listen for editMode active

    useEffect(() => {
        console.log('dfdfd',editing)
            const {id,name,amount, type} = editing;
            console.log('id',id);
            console.log('editing',editing);
            if(id){
                setEditMode(true);
                setName(name);
                setType(type);
                setAmount(amount);
            }else{
                setEditMode(false);
                reset();
            }
    }, [editing]);



    const reset = () => {
        setName('');
        setType('');
        setAmount('');
    }

    const handleCreate = (e) => {
        e.preventDefault();
        dispatch(
            createTransaction({
            name,
            type,
            amount: Number(amount),
        })
        );

        reset();
    }


    const handleUpdate = (e,id) => {
        e.preventDefault();
        dispatch(
            changeTransaction({
                id,
                data: {name, type, amount: Number(amount)}
            })
        );
        reset();
        setEditMode(false);
    }


    const cancelEditMode = () => {
        setEditMode(false);
        reset();
    }








    return (
        <div className="form">
            <h3>Add new transaction</h3>
            {/* eslint-disable-next-line no-restricted-globals */}
            <form onSubmit={editMode ? () =>  handleUpdate(event,editing.id)  :  handleCreate}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter expense name"
                    value={name}
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
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                />
            </div>

            <button disabled={isLoading} type="submit" className="btn">{editMode ? 'Edit' : 'Add'} Transaction</button>

                {(!isLoading && isError) && <p className="error">{error}</p> }
            </form>

            {editMode && <button onClick={cancelEditMode} className="btn cancel_edit">Cancel Edit</button> }
        </div>
    );
}

export default Form;