import React from 'react';


const Cart = (props) => {
    const cart =props.cart;
    const total = cart.reduce((total,product)=>total + product.price * product.quantity || 1,0);
    let shipping =0;
    if(total>35){
        shipping = 0;
    }
    else if(total>15){
        shipping = 4.99;
    }
    else if(total>0){
        shipping =12.99;
    }
    const tax = ( total/10).toFixed(2);
    const grandTotal= (total + shipping + Number(tax)).toFixed(2);
    return (
        <div>
            <h5>Order Summary</h5>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price: {total}</p>
            <p><small>Shipping Cost: {shipping}</small></p>
            <p><small>Tax + Vat: {tax}</small></p>
            <p>Total Price: {grandTotal}</p>
           {
               props.children
           }
        </div>
    );
};

export default Cart;