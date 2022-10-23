import React, {useEffect} from 'react';
import SingleTransaction from "./SingleTransaction";
import {useDispatch, useSelector} from "react-redux";
import { fetchTransactions} from "../../features/transaction/transactionSlice";

function Transactions(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTransactions());
    },[dispatch])

    const {transactions,isLoading,isError,error} = useSelector(state => state.transaction);
    let content = null;
    if(isLoading) content = <p className="error">Loading...</p>
    if(!isLoading && isError) content = <p className="error">There was an error occoured</p>;
    if(!isLoading && !isError && transactions?.length > 0 ) content =
        transactions.map(transaction => <SingleTransaction key={transaction.id} transaction={transaction}/>)
    if(!isLoading && !isError && transactions?.length === 0 ) content = <p>No Transaction found</p>;




    return (
        <>
            <p className="second_heading">Your Transactions:</p>

            <div className="conatiner_of_list_of_transactions">
                <ul>
                    {content}
                </ul>
            </div>
        </>
    );
}

export default Transactions;