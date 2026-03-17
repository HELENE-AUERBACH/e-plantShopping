import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import './CartItem.css';

const Product = ({ product }) => {
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
    const productAdded = cart.find(item => item.name === product.name);

    const handleAddProduct = (product) => {
        if (!productAdded || productAdded.quantity === 0) {
            dispatch(addItem({ name: product.name, image: product.image, cost: product.cost }));
            const totalNumberOfItems = cart.reduce((accumulator, item) => accumulator + item.quantity, 1,);
            console.log(totalNumberOfItems);
            const text = document.getElementsByTagNameNS('http://www.w3.org/2000/svg', 'text')[0];
            text.textContent = totalNumberOfItems;
        }
    };

    return (
        <div className="product-card">
            <div className="product-title">
                <h2>{product.name}</h2>
            </div>
            <img className="product-image" src={product.image} alt={product.name} />
            <div className="product-price">{product.cost}</div>
            <div className="product-description">
                <p>{product.description}</p>
            </div>
            <button
                className={!productAdded || productAdded.quantity === 0 ? "product-button" : "product-button added-to-cart"}
                onClick={() => handleAddProduct(product)}
            >
                {!productAdded || productAdded.quantity === 0 ? "Add to Cart" : "Added to Cart"}
            </button>
        </div>
    );
};

export default Product;