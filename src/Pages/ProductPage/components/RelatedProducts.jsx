import axios from 'axios';
import React, { memo, useEffect, useState } from 'react';
import { API } from '../../../Api/Api';
import ProductCard from '../../../components/ProductCard';
import CustomSkeleton from '../../../utilities/CustomSkeleton';

const RelatedProducts = memo(({subcatId, productId}) => {
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log(subcatId, productId);
    
    useEffect(() => { 
        const getRelatedProds = async () => {
            setLoading(true);
            try {
                const res = await axios.get(API.getSubcategoryProducts(subcatId));
                if (res?.data?.data?.SubCategoryProducts) { 
                    const allProds = res.data.data.SubCategoryProducts.filter(prod => prod._id !== productId);
                    // Shuffle and pick 5 random products
                    const randomProds = allProds.sort(() => Math.random() - 0.5).slice(0, 5);
                    setRelatedProducts(randomProds);
                }
            } catch (error) {
                setError(error.response?.data?.message)
            } finally {  
                setLoading(false);
            }
        }
        if (subcatId && productId) { 
            getRelatedProds();
        }
    }, [productId]);

    useEffect(() => { 
        // window.location.reload();
    }, [subcatId]);
    
    return (
        <div className='conatiner flex flex-col px-5 md:px-10 lg:px-20 py-10 gap-5 '>
            <h1 className='w-full pb-3 border-b text-xl font-semibold'>You may also like</h1>
            <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 smXl:grid-cols-5 gap-2 max-sm:gap-4 max-sm:flex max-sm:flex-col max-sm:items-center">
                {!loading && !error && 
                    relatedProducts.map((p) => (
                        <ProductCard key={p._id} product={p} />
                    ))
                }
                {
                    loading  && [...Array(5)].map((_, index) => (
                        <div key={index} className="w-full max-sm:w-[90%]">
                            <CustomSkeleton
                                width={"100%"}
                                className={"h-[450px] sm:h-[450px] md:h-[350px] xl:h-[397px]"}
                            />
                            <CustomSkeleton width={"100%"} height={7} />
                            <CustomSkeleton width={"50%"} height={7} />
                        </div>
                    ))
                }
                { error && <div className='w-full justify-center items-center'>
                    <p className='text-gray-600 font-semibold text-xl'>{error}</p>
                </div> }
            </div>
        </div>
    )
})

export default RelatedProducts