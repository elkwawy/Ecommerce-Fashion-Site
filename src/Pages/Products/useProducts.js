import axios from "axios";
import { useState } from "react";
import { API } from "../../Api/Api";

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const reset = () => {
        setProducts([]);
        setPage(1);
        setLoading(true);
        setHasMore(true);
    };
    const getProducts = async (searchTerm) => {
        if (loading || !hasMore) return; // Prevent duplicate calls
        console.log(searchTerm);
        try {
            setLoading(true);
            const res = await axios.get(API.product, {
                params: { limit: 10, sort: "-createdAt", page, search : searchTerm || null },
            });
            console.log(res.data.data);

            if (res.data.data.length === 0) {
                setHasMore(false);
            } else {
                setProducts((prev) => [...prev, ...res.data.data]);
                setPage((prev) => prev + 1);
            }
        } catch (error) {
            setError(error.response?.data?.message || "Error fetching products");
        } finally {
            setLoading(false);
        }
    };
    return {products, loading, error, getProducts, page, hasMore, reset};
}

export default useProducts