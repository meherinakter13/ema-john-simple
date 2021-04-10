import React, { useEffect, useState } from 'react';
import Product from '../Product/Product'
import Cart from '../Cart/Cart'
import './Shop.css'
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    
    // const first10 = fakeData.slice(0,10);
   const [products, setProducts]= useState([]);
   const [cart,setCart] = useState([]);
   const[ search, setSearch] = useState('');

   useEffect(()=>{
       fetch('https://mighty-headland-56767.herokuapp.com/products?search='+search)
    // fetch('http://localhost:4200/products?search='+search)
       .then(res => res.json())
       .then(data => setProducts(data))
   },[search])

   useEffect(()=>{
        const savedCart =getDatabaseCart();
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
    //    if(products.length > 0){
    //     const cartProducts = productKeys.map(key=>{
    //         const product = products.find(pd=>pd.key===key);
    //         product.quantity = savedCart[key]
    //         return product;
    //     })
    //     setCart(cartProducts);
    //    }
   },[])

   const handleAddProduct=(product) =>{
       const toBeAdded = product.key;
       const sameProduct = cart.find(pd => pd.key === toBeAdded);
       let count=1;
       let newCart;
       if(sameProduct){
           count= sameProduct.quantity + 1;
           sameProduct.quantity = count;
           const others = cart.filter(pd => pd.key !== toBeAdded);
           newCart =[...others, sameProduct];
       }
      else{
        product.quantity=1;
        newCart = [...cart,product];
      }
       setCart(newCart);
       addToDatabaseCart(product.key, count);
   }
   const handleSearch = event => {
        setSearch(event.target.value);
   }
    return (
        <div className="same-container">
            
            <div className="product-container">
              <input type="text" onBlur={handleSearch} placeholder="search product"/>
              
                {
                    products.map.length === 0 && <p>loading..........</p>
                }
                    {
                     products.map(pd=><Product product ={pd} handleAddProduct={handleAddProduct}showButton={true} key={pd.key}></Product>)
                    }     
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                    <button className="button-click">Review Cart</button>
                    </Link>
                </Cart>
            </div>
           
        </div>
    );
};

export default Shop;