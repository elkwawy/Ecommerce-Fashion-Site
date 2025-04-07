import { memo } from "react"

const ProductsError = memo(({error, searchTerm}) => {
    if (error == "No more products" && searchTerm)
        return (<div className="text-center text-2xl mt-32 font-semibold">No results for "{searchTerm}"</div>)
    else if (error !== "No more products") { 
        return (<div className="text-center text-2xl mt-32 font-semibold">{error}</div>)
    }
})

export default ProductsError