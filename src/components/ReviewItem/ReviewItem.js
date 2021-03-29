import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity,key,price}= props.product;
    const itemStyle ={
        borderBottom:'2px solid black',
        marginBottom:'5px',
        paddingBottom:'5px',
        marginLeft:'200px'

    }
    return (
        <div style={itemStyle}>
            <h4 className="product-name"> {name}</h4>
            <p>Quantity: {quantity}</p>
            <p><small>${price}</small></p>
            <br/>
            <button onClick={()=>props.removeProduct(key)} className="button-click">Remove</button>

        </div>
    );
};

export default ReviewItem;