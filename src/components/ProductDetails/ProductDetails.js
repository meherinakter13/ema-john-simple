import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Product from '../Product/Product';


const ProductDetails = () => {
    const{productKey}= useParams();
    const [product,setProduct] = useState({})

    useEffect(()=>{
        fetch('http://localhost:4200/product/'+ productKey)
        .then(res => res.json())
        .then(data => setProduct(data))
    },[productKey])
    // const product = fakeData.find(pd=>pd.key===productKey)
    return (
        <div>
            <h1>Your Product Details</h1>
            <Product product={product} showButton={false}></Product>
        </div>
        
    );
};

export default ProductDetails;