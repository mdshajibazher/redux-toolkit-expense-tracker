import React from 'react';
import deleteImage from "../../assets/images/delete.svg";
import editImage from "../../assets/images/edit.svg";
import {useDispatch} from "react-redux";
import {editActive} from "../../features/transaction/transactionSlice";


function SingleTransaction({transaction}) {

    const dispatch = useDispatch();

    const handleEdit =  () => {
        dispatch(editActive(transaction));
    }
    return (

        <li className={`transaction ${transaction.type }`}>
            <p>{transaction.name}</p>
            <div className="right">
                <p>৳ {transaction.amount}</p>
                <button className="link">
                    <img
                        className="icon"
                        src={deleteImage}
                    />
                </button>
                <button onClick={handleEdit} className="link">
                    <img
                        className="icon"
                        src={editImage}
                    />
                </button>
            </div>
        </li>
    );
}

export default SingleTransaction;