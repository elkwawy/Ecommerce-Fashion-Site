import axios from "axios";
import { useState } from "react"
import { API } from "../../Api/Api";

const useProduct = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getProductData = async (id) => { 
        // logic
        try {
            setLoading(true);
            const res = await axios.get(API.getProductData(id));
            setProduct(res.data.data);
        } catch (error) {
            console.log(error?.response?.data?.message);
            setError(error?.response?.data?.message);
        } finally { 
            setLoading(false);
        }
    }
    
    const addProductToWishList = async (id) => { 
        // logic
    }
    
    const addProductToCart = async (id) => { 
        // logic
    }

    return {product, loading, error, getProductData, addProductToWishList, addProductToCart}


}

export default useProduct;