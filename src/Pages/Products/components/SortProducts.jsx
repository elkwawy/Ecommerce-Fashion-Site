import { memo } from "react"

const SortProducts = memo(({onChange, term}) => {
    const sortTerms = ["Newest",  "Name", "Price Low to High", "Price High to Low"];
    return (
        <ul className=" absolute top-full mt-2 shadow-xl text-left z-30 text-black left-0 w-[140%] rounded-sm bg-white border ">
            {
            sortTerms.map((t) => <li className={`px-2  ${term == t ? "font-bold" : ""} text-sm text-gray-600 py-1 trans hover:bg-gray-100 cursor-pointer`} 
                onClick={() => onChange(t)}
                >
                    {t}
                </li>
            )}
        </ul>
    )
})

export default SortProducts