import React from 'react';
import SingleTransaction from "./SingleTransaction";

function Transactions(props) {
    return (
        <>
            <p className="second_heading">Your Transactions:</p>

            <div className="conatiner_of_list_of_transactions">
                <ul>
                    <SingleTransaction/>
                </ul>
            </div>
        </>
    );
}

export default Transactions;