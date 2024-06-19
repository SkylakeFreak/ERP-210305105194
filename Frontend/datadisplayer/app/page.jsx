"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Click = (product) => {
    window.location.href = `/product/${product.productName}`;
};

const App = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [sortOption, setSortOption] = useState('name-asc');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const itemsPerPage = 1;

    useEffect(() => {
        axios.get('http://localhost:3004/categories/products')
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const sortData = (data, sortOption) => {
        const [key, order] = sortOption.split('-');
        return data.map(category => ({
            ...category,
            products: category.products.sort((a, b) => {
                if (order === 'asc') {
                    if (typeof a[key] === 'string') {
                        return a[key].localeCompare(b[key]);
                    }
                    return a[key] - b[key];
                } else {
                    if (typeof a[key] === 'string') {
                        return b[key].localeCompare(a[key]);
                    }
                    return b[key] - a[key];
                }
            })
        }));
    };

    const currentItems = sortData(data, sortOption).slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    const handleBackClick = () => {
        setSelectedProduct(null);
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <>
                {'★'.repeat(fullStars)}
                {halfStar && '☆'}
                {'☆'.repeat(emptyStars)}
            </>
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {!selectedProduct ? (
                <>
                    <h1 className="text-3xl font-bold mb-8">Product Categories</h1>
                    <div className="mb-[150px]">
                        <label htmlFor="sort" className="block text-lg font-semibold mb-2">Sort by:</label>
                        <select id="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="border p-2 rounded text-black">
                            <option value="name-asc">Name (A-Z)</option>
                            <option value="name-desc">Name (Z-A)</option>
                            <option value="price-asc">Price (Low to High)</option>
                            <option value="price-desc">Price (High to Low)</option>
                            <option value="rating-asc">Rating (Low to High)</option>
                            <option value="rating-desc">Rating (High to Low)</option>
                            <option value="discount-asc">Discount (Low to High)</option>
                            <option value="discount-desc">Discount (High to Low)</option>
                            <option value="availability-asc">Availability (Low to High)</option>
                            <option value="availability-desc">Availability (High to Low)</option>
                        </select>
                    </div>
                    {currentItems.map((category, index) => (
                        <div key={index} className="mb-10">
                            <h2 className="text-5xl flex justify-center font-semibold font-mono mb-10">{category.category}</h2>
                            <ul className="space-y-4">
                                {category.products.map((product, idx) => (
                                    <li key={idx} onClick={() => handleProductClick(product)} className="border p-4 rounded-lg shadow hover:animate-pulse hover:cursor-pointer hover:text-2xl">
                                        <p className="font-bold">Name: {product.productName}</p>
                                        <p>Price: ${product.price}</p>
                                        <p>Rating: <span className='text-yellow-500 text-xl'>{renderStars(product.rating)}</span></p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <Pagination itemsPerPage={itemsPerPage} totalItems={data.length} setPage={setPage} />
                </>
            ) : (
                <ProductDetails product={selectedProduct} onBackClick={handleBackClick} />
            )}
        </div>
    );
};

const ProductDetails = ({ product, onBackClick }) => {
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <>
                {'★'.repeat(fullStars)}
                {halfStar && '☆'}
                {'☆'.repeat(emptyStars)}
            </>
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <button onClick={onBackClick} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">Back to List</button>
            <h2 className="text-2xl font-semibold mb-4">{product.productName}</h2>
            <p className="font-bold">Name: {product.productName}</p>
            <p>Price: ${product.price}</p>
            <p>Rating: {renderStars(product.rating)}</p>
            <p>Discount: {product.discount}%</p>
            <p>Availability: {product.availability === 'yes' ? 'Available' : 'Out of Stock'}</p>
        </div>
    );
};

const Pagination = ({ itemsPerPage, totalItems, setPage }) => {
    const pageNumbers = [];
    const totalPages = totalItems % itemsPerPage === 0 ? totalItems / itemsPerPage : Math.floor(totalItems / itemsPerPage) + 1;

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="flex justify-center">
            <ul className="flex space-x-2">
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button
                            onClick={() => setPage(number)}
                            className="px-4 py-2 border rounded hover:bg-gray-200">
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default App;
