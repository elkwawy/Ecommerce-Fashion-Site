import React, { useEffect, useState } from 'react';
import ProductsSection from './components/ProductsSection';
import { useDispatch } from 'react-redux';
import { fetchProducts, resetProducts, resetSearchTerm, setSearchTerm } from '../../Redux Toolkit/slices/allProductsSlice';

const AllProducts = () => {
    const [newestSort, setNewestSort] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const handleNewestSort = () => { 
        setNewestSort(true);
    }
    useEffect(() => { 
        window.scrollTo(0, 0);
    }, []);
    const handleSearchProduct = (e) => { 
        e.preventDefault();
        const searchTerm = e.target[0].value;
        if (searchTerm) { 
            dispatch(resetProducts());
            dispatch(setSearchTerm(searchTerm));
            dispatch(fetchProducts());
            setSubmitted(true);
        }
    }
    const handleClearSearch = () => {
        if (submitted) { 
            dispatch(resetProducts());
            dispatch(resetSearchTerm());
            dispatch(fetchProducts());
            setSearch("");
            setSubmitted(false);
        } else { 
            setSearch("");
        }
    }
    return (
        <div className='container py-10 min-h-screen'>
            <div className="w-full flex items-center justify-between">
                <h1 className="capitalize font-bold text-3xl">Our Products</h1>
                <div className='flex gap-2 items-center'>
                    
                    <div className="flex">
                        <div className="relative w-full">
                            <form onSubmit={handleSearchProduct}>
                                <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" id="search-dropdown" className="block px-2.5 py-1.5 w-64 text-sm border-2 border-black" placeholder="Search Products.." />
                                { search && (
                                    <button 
                                        type="button" 
                                        onClick={handleClearSearch} 
                                        className="absolute right-10 top-1/2 transform -translate-y-1/2 text-black hover:text-gray-600"
                                    >
                                        ✕
                                    </button>
                                )}
                                <button type="submit" className="absolute top-0 end-0 trans p-2.5 text-sm font-medium h-full text-white bg-black border border-black hover:opacity-80">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                    <span className="sr-only">Search</span>
                                </button>
                            </form>
                        </div>
                    </div>

                    <button onClick={handleNewestSort} className={`px-5 py-1 border-2 ${newestSort ? "bg-black text-white" : "hover:bg-gray-100"} border-black trans  rounded-sm`}>Sort By Newest</button>

                </div>
            </div>
            <ProductsSection />
        </div>
    )
}

export default AllProducts