import React, { useEffect, useRef, useState } from 'react';
import { TbArrowsSort } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchProducts, resetProducts, resetSearchTerm, setSearchTerm } from '../../Redux Toolkit/slices/allProductsSlice';
import ProductsSection from './components/ProductsSection';
import SortProducts from './components/SortProducts';

const converter= { 
    "Newest" : "-createdAt",
    "Price High to Low" : "-priceAfterDiscount",
    "Price Low to High" : "priceAfterDiscount",
    "Name" : "name",
}

const AllProducts = () => {
    const [openSort, setOpenSort] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [search, setSearch] = useState("");
    const [sortTerm, setSortTerm] = useState("Newest");
    const dispatch = useDispatch();
    const sortContainer = useRef(null);
    const location = useLocation();
    const handleOpenSort = () => { 
        setOpenSort(prev => !prev);
    }
    useEffect(() => { 
        window.scrollTo(0, 0);
        // dispatch(setSearchTerm(""));
        // setSortTerm("Newest");
        dispatch(resetProducts());
        dispatch(fetchProducts());
    }, [location.pathname]);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sortContainer.current && !sortContainer.current.contains(event.target)) {
                setOpenSort(false);
            }
        };

        if (openSort) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openSort]);
    const handleSortTermChange = (term) => {
        if (term != sortTerm){ 
            // logic
            dispatch(resetProducts());
            setSortTerm(term);
            dispatch(fetchProducts(converter[term]));
        }
        setOpenSort(false);
    } 

    const handleSearchProduct = (e) => { 
        e.preventDefault();
        const searchTerm = e.target[0].value;
        if (searchTerm) { 
            dispatch(resetProducts());
            dispatch(setSearchTerm(searchTerm));
            dispatch(fetchProducts(converter[sortTerm]));
            setSubmitted(true);
        }
    }
    const handleClearSearch = () => {
        if (submitted) { 
            dispatch(resetProducts());
            dispatch(resetSearchTerm());
            dispatch(fetchProducts(converter[sortTerm]));
            setSearch("");
            setSubmitted(false);
        } else { 
            setSearch("");
        }
    }
    const handleShowMore = () => { 
        dispatch(fetchProducts(converter[sortTerm]));
    }
    return (
        <div className='container py-10 min-h-screen'>
            <div className="w-full flex flex-col gap-3 sm:gap-6 md:gap-0 md:flex-row md:items-center justify-between">
                <h1 className="capitalize max-sm:text-center font-bold text-3xl">Our Products</h1>
                <div className='flex flex-col-reverse gap-3  sm:flex-row justify-end  items-center'>
                    <div ref={sortContainer} className="relative">
                        <button onClick={handleOpenSort} className={`px-5  flex items-center gap-1 py-1 border-2 ${openSort ? "bg-black text-white" : "hover:bg-gray-100"} border-black trans  rounded-sm`}>
                            <TbArrowsSort className='text-lg'/> Sort by
                        </button>
                        { openSort && <SortProducts onChange={handleSortTermChange} term={sortTerm} /> }
                    </div>
                    <div className="flex max-sm:w-full ">
                        <div className="relative max-sm:w-full rounded-sm">
                            <form onSubmit={handleSearchProduct} className='max-sm:w-full '>
                                <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" id="search-dropdown" className="block px-2.5 py-1.5 w-full sm:w-[370px] text-sm border-2 border-black" placeholder="Search Products.." />
                                { search && (
                                    <button 
                                        type="button" 
                                        onClick={handleClearSearch} 
                                        className="absolute font-bold  px-2 right-8 top-1/2 transform -translate-y-1/2 text-black hover:text-gray-600"
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
                </div>
            </div>
            <ProductsSection handleShowMore={handleShowMore} />
        </div>
    )
}

export default AllProducts