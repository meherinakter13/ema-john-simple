import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';


const Review = () => {
    const[cart,setCart]= useState([]);
    const[orderPlaced, setOrderPlaced] = useState([]);
    const history = useHistory();

    const handleProceedCheckout = () =>{
        history.push('/shipment');
    //     setCart([]);
    //    processOrder();
    //    setOrderPlaced(true);
    }
// let thankYou;
// if(orderPlaced){
// thankYou = <img src={happyImage} alt=""/>

// }

    const removeProduct = (productKey)=>{
        const newCart = cart.filter(pd=> pd.key!==productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys= Object.keys(savedCart);
        fetch('https://mighty-headland-56767.herokuapp.com/productsByKeys',{
            method: "POST",
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
        // const cartProducts = productKeys.map(key=>{
        //     const product = fakeData.find(pd=>pd.key===key);
        //     product.quantity = savedCart[key]
        //     return product;
        // })
        // setCart(cartProducts);

    },[])
    return (
        <div className="same-container">
            <div className="product-container">
            {
                cart.map(pd=> <ReviewItem product={pd} key={pd.key} removeProduct={removeProduct}></ReviewItem>)
            }
            {/* {thankYou} */}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="button-click">Proceed Checkout</button>
                </Cart>
            </div>
        </div>

       
    );
};

export default Review;