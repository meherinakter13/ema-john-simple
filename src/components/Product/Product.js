import React from 'react';

const Product = (props) => {
    return (
        <div>
            <h1>this is product</h1>
           <h3>{props.product.name}</h3>   
        </div>
    );
};

export default Product;